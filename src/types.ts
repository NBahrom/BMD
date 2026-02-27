export interface Singer {
  id: string
  nameKey: string
  descKey: string
  image: string
  categoryIds: string[]
  spotifyLink: string
  yandexLink: string
  socials: {
    id: string,
    link: string
  }[]
  projects: {
    coverPhoto: {
      alt:string,
      src: string
    },
    video: {
      type: string,
      src: string
    } | null
  }[]
}
