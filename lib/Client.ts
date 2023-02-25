import sannityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client=sannityClient({
    projectId:'iumnt0ku',
    dataset:'production',
    apiVersion:'2023-01-20',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN, 
})

const builder=imageUrlBuilder(client)

export const urlFor= (source:any) =>builder.image(source)