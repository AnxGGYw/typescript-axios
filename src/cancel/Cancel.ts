export default class Cancel {
  message?: string

  constructor(messsage?: string) {
    this.message = messsage
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
