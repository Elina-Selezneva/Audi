const getTemplate = (data = [], placeholder) => {
    const text = placeholder ?? 'Text по умолчанию'

    const items = data.map(item => {
        return `
            <div class="select__item" data-type="item" data-id="${item.id}">${item.value}</div>
        `
    })

    return `
     
        <div class="select__input" data-type="input">
                <span data-type="value">${text}</span>
                <i class="fa fa-chevron-down" data-type="arrow"></i>
            </div>
            <div class="select__dropdown">
                <div class="select__list">
                    ${items.join('')}
                </div>
            </div>
    `
}

Select {
    constructor(select, options) {
        this.$el = document.querySelector(select)
        this.options = options
        this.selectedId = null

        this.#render()
        this.#setup()
    }

    #render(){
        const {placeholder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder)
    }

    #setup(){
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
    }

    clickHandler(event){
        const {type} = event.target.dataset

        if (type === 'input'){
            this.toggle()
        } else if (type === 'item'){
            const id = event.target.dataset.id
            this.select(id)
        }
    }

    get isOpen(){
        return this.$el.classList.contains('open')
    }

    get current(){
        return this.options.data.find(item => item.id === this.selectedId)
    }

    select(id){
        this.selectedId = id
        this.$value.textContent = this.current.value

        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

        this.close()
    }

    toggle(){
        this.isOpen ? this.close() : this.open()

    }

    open(){
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')
    }

    close(){
        this.$el.classList.remove('open')
        this.$arrow.classList.remove('fa-chevron-up')
        this.$arrow.classList.add('fa-chevron-down')
    }

    destroy(){
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}