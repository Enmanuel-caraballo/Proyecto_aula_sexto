import { registerPlugin } from "@capacitor/core";


export interface IGooglePayPlugin {
  execute: ( data: {uuid: string}) => Promise<{message: string}>
}

const googlePayPlugin = registerPlugin<IGooglePayPlugin>('GooglePayPlugin')
export default googlePayPlugin;
