/* eslint-disable @typescript-eslint/no-explicit-any */
// Request Event dispatched by a DApp
export interface EIP6963RequestProviderEvent extends Event {
  type: 'eip6963:requestProvider'
}

export interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: 'eip6963:announceProvider'
  detail: EIP6963ProviderDetail
}

export interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: {
    request(params: { method: string; params: any }): Promise<any>
  }
}

export interface EIP6963ProviderInfo {
  uuid: string
  name: string
  icon: string
  rdns: string
}
