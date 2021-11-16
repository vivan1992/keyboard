class TextLorem {
    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    getText = async () => {
        const res = await this.getResource('https://baconipsum.com/api/?type=meat-and-filler&paras=1');
        return String(res).replace(/\s\s/g, ' ').match(/./g);
    };

}

export default TextLorem;