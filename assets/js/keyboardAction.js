async function copy(e){
    let text = this.dataset.copy;
    try {
        await navigator.clipboard.writeText(text);
        alert("Copiado: " + text); 
    } catch (error) {
        console.error(error.message);
    }
}
