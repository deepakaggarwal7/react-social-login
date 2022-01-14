import React from "react";

export type Provider = "amazon" | "facebook" | "github" | "google" | "instagram" | "linkedin";

export interface Props {
  appId: string
  autoCleanUri?: boolean
  autoLogin?: boolean
  gatekeeper?: string
  getInstance?: () => React.RefObject<any>
  onLoginFailure?: (result: any) => void
  onLoginSuccess?: (result: any) => void
  onLogoutFailure?: (result: any) => void
  onLogoutSuccess?: (result: any) => void
  provider: Provider
  className?: string
  redirect?: string
  scope?: [] | string
  [key: string]: any
}

export default function SocialLogin(
  WrappedComponent: React.ComponentType<any>,
  LoaderComponent?: React.ComponentType<any>
): React.ComponentType<Props>
