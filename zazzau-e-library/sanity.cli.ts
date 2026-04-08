import { defineCliConfig } from '@sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'priwkw0o',
    dataset: 'production',
  },
  deployment: {
    appId: 'gwtii0i8tuuekflvazuzrh0z',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
