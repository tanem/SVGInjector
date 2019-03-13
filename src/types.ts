/* istanbul ignore file */

export type DoneCallback = (elementsLoaded: number) => void

export type Errback = (error: Error | null, svg?: Element) => void

export enum EvalScripts {
  Always = 'always',
  Once = 'once',
  Never = 'never'
}
