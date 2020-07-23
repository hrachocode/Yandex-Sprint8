class UserInfo {
    constructor(nameSelector, descSelector) {
        this._nameSelector = nameSelector;
        this._descSelector = descSelector;
    }

    getUserInfo(){
        return {
            name: this._nameSelector.textContent,
            description: this._descSelector.textContent
        }
    }

    setUserInfo(formData){
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        profileTitle.innerText = formData.name;
        profileDescription.innerText = formData.description;
    }

}

export default UserInfo;