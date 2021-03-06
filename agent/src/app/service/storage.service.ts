import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  clearToken() {
    window.sessionStorage.setItem('jwt', "")
  }

  constructor() {/* constructor is empty */ }

  storeTokenData(token: string, refreshToken: string): void {
    sessionStorage.setItem("jwt", token);
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  getCompanyIdFromToken(): string {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(encodeURIComponent(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.companyId
    }
    return ""
  }

  getRoleFromToken(): string {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(encodeURIComponent(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.role
    }
    return ""
  }

  getIdFromToken(): string {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(encodeURIComponent(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.userId
    }
    return ""
  }
  getToken() {
    return sessionStorage.getItem("jwt")
  }

  getExpirationDateFromToken(): any {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(encodeURIComponent(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.exp
    }
    return ""
  }

  getRefreshToken() {
    return sessionStorage.getItem("refreshToken")
  }

  getEmailFromToken() {
    const jwtToken = window.sessionStorage.getItem('jwt')
    if (jwtToken) {
      const tokenSplit = jwtToken.split('.')
      const decoded = decodeURIComponent(encodeURIComponent(window.atob(tokenSplit[1])))
      const obj = JSON.parse(decoded)
      return obj.sub
    }
    return ""
  }
}
