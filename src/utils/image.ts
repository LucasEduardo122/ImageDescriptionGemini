import axios from "axios";

export function verifyImageLink(link: string) {
    const arrayImagesLink = ['png', 'svg', 'jpeg', 'jpg'];

    if(arrayImagesLink.find(item => link.includes(item)) == undefined) {
        return null
    } else {
        return link;
    }
}

export async function getImage(link: string) {
    try {
        const {data: imageBuffer} = await axios.get(link, {responseType: 'arraybuffer'})
        return imageBuffer;
    } catch (error) {
        console.log("Erro ao baixar imagem. ", error)
        return null;
    }
}
