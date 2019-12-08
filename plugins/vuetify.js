// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify, {
  VApp,
  VAppBar,
  VAvatar,
  VFooter,
  VLayout,
  VContainer,
  VDivider,
  VDialog,
  VSpacer,
  VTooltip,
  VCard,
  VCardText,
  VCardTitle,
  VCardActions,
  VToolbar,
  VToolbarTitle,
  VToolbarItems,
  VTabs,
  VTab,
  VTabItem,
  VTabsItems,
  VTextField,
  VSnackbar,
  VRow,
  VMenu,
  VCol,
  VNavigationDrawer,
  VIcon,
  VList,
  VListItem,
  VListGroup,
  VListItemTitle,
  VListItemContent,
  VListItemIcon,
  VListItemAvatar,
  VListItemAction,
  VBtn,
  VImg,
  VChip,
  VCheckbox,
  VInput,
  VBadge,
  VFileInput,
  VSheet,
  VOverlay,
  VStepper,
  VStepperStep,
  VStepperItems,
  VStepperHeader,
  VStepperContent,
} from 'vuetify/lib'

import {
  Ripple,
  Resize
} from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAppBar,
    VAvatar,
    VFooter,
    VLayout,
    VContainer,
    VDivider,
    VDialog,
    VSpacer,
    VTooltip,
    VCard,
    VCardText,
    VCardTitle,
    VCardActions,
    VToolbar,
    VToolbarTitle,
    VToolbarItems,
    VTabs,
    VTab,
    VTabItem,
    VTabsItems,
    VTextField,
    VSnackbar,
    VRow,
    VMenu,
    VCol,
    VNavigationDrawer,
    VIcon,
    VList,
    VListItem,
    VListGroup,
    VListItemTitle,
    VListItemContent,
    VListItemIcon,
    VListItemAvatar,
    VListItemAction,
    VBtn,
    VImg,
    VChip,
    VCheckbox,
    VInput,
    VBadge,
    VFileInput,
    VSheet,
    VOverlay,
    VStepper,
    VStepperStep,
    VStepperItems,
    VStepperHeader,
    VStepperContent,
  },
  directives: {
    Ripple,
    Resize
  }
})

// const opts = {}
//
// export default new Vuetify(opts)

export default new Vuetify({
  // icons: {
  //   iconfont: 'mdi'
  // },
  theme: {
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
