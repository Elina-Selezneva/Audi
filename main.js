
const searchInput = document.querySelector('#search_input');
const buttonSearch = document.querySelector('.header_search');
const whiteNav= document.querySelector('.ul-wrapper');
const searchBtnOn = document.querySelector('.header_search-btnOn')
const searchBtnOff = document.querySelector('.header_search-btnOff')
let buttonSearchValue = false;

buttonSearch.addEventListener('click', () =>{
    if (!buttonSearchValue){
        searchInput.classList.remove('disply-none');
        whiteNav.classList.add('disply-none')
        searchBtnOn.classList.add('disply-none')
        searchBtnOff.classList.remove('disply-none')
        buttonSearchValue = true;
    } else {
        searchInput.classList.add('disply-none');
        whiteNav.classList.remove('disply-none')
        searchBtnOn.classList.remove('disply-none')
        searchBtnOff.classList.add('disply-none')
        buttonSearchValue = false;
    }

})

const modalButton = document.querySelector('.header_region')
const modal = document.querySelector('#modal')
const modalClose = document.querySelector('.worldwide-Page_close')

modalButton.addEventListener('click', ()=>{
    modal.classList.add('worldwide-Page_unvicible')
})
modalClose.addEventListener('click', ()=>{
    modal.classList.remove('worldwide-Page_unvicible')
})


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

class Select {
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
}

const select = new Select('#select',{
    placeholder: 'Please, select your country',
    data: [
        {id: '1', value: "Albania"},
        {id: '2', value: "Argentina"},
        {id: '3', value: "Armenia"},
        {id: '4', value: "Austria"},
        {id: '6', value: "Bahrain"},
        {id: '7', value: "Belgium"},
        {id: '8', value: "Brazil"},
        {id: '9', value: "Canada"},
        {id: '10', value: "Denmark"},
        {id: '11', value: "Estonia"},
        {id: '12', value: "Finland"},
        {id: '13', value: "Russia"},
    ]
})

$(document).ready(function () {
    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
})
