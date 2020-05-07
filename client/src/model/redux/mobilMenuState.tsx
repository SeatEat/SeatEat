const initialState = {isOpen: false};

export enum MobileMenuAction {
    TOOGLE_MOBILE_MENU = "TOOGLE_MOBILE_MENU",
}

export interface MobileMenuState {
    isOpen: boolean
}

// Change value of the state
export interface ToogleMobileMenu {
    type: MobileMenuAction.TOOGLE_MOBILE_MENU,
    payload: boolean
}
export function toggleMobileMenu(isOpen: boolean): ToogleMobileMenu {
    return {
        type: MobileMenuAction.TOOGLE_MOBILE_MENU,
        payload: isOpen
    }
}

export function mobileMenuReducer(
    state = initialState,
    action: ToogleMobileMenu
): MobileMenuState {
    switch (action.type) {
        case MobileMenuAction.TOOGLE_MOBILE_MENU:
            return {
                isOpen: action.payload
            };
        default:
            return state
    }
}