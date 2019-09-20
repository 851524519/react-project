import actionTypes from '../actions/actionTypes'
const initState = {
    isLoading: false,
    list: [{
        id: 1,
        title: 'Lorem ipsum dolor sit 1111',
        desc: '111 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio commodi accusamus similique doloremque earum nulla molestiae culpa fugiat repudiandae, voluptate exercitationem vero laborum, temporibus, impedit assumenda ducimus laboriosam veniam laudantium.',
        hasRead: false
    }, {
        id: 2,
        title: 'Lorem ipsum dolor sit 2222',
        desc: '222 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio commodi accusamus similique doloremque earum nulla molestiae culpa fugiat repudiandae, voluptate exercitationem vero laborum, temporibus, impedit assumenda ducimus laboriosam veniam laudantium.',
        hasRead: false
    }]
}

export default ( state = initState, action ) => {
    switch (action.type) {
        case actionTypes.RECIVED_NOTIFICATIONS:
            return {
                ...state,
                list: action.payload.list
            }
        case actionTypes.START_NITIFICATION_POST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_NITIFICATION_POST:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item => {
                if(item.id === action.payload.id) {
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list: newList
            }
        case actionTypes.MARK_ALLNOTIFICATIONS_AS_READ:
            return {
                ...state,
                list: state.list.map(item => {
                    item.hasRead = true
                    return item
                })
            }
        default:
            return state
    }
}