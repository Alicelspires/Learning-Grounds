export function prevNotes(){
    let note = [
        {
            id: 0,
            title: "Poema - Ouvir Estrelas",
            text: "Ora (direis) ouvir estrelas! Certo,\nPerdeste o senso!\" E eu vos direi, no entanto,\nQue, para ouvi-las, muita vez desperto\nE abro as janelas, pálido de espanto...\n\nE conversamos toda a noite,\nenquanto a Via-Láctea, como um pálio aberto,\nCintila. E, ao vir do sol, saudoso e em pranto,\nInda as procuro pelo céu deserto.\n\nDireis agora: \"Tresloucado amigo!\nQue conversas com elas? Que sentido\nTem o que dizem, quando estão contigo?\"\n\nE eu vos direi: \"Amai para entendê-las!\nPois só quem ama pode ter ouvido\nCapaz de ouvir e e de entender estrelas. \n\n(Olavo Bilac)",
            date: new Date(2025, 6, 8),
            color: "#0c625d"
        },
        {
            id: 1,
            title: "Shooping list",
            text: "Buy new clothes, school supplies and a new paintbrush",
            date: new Date(2025, 6, 10),
            color: "#462e59",
        }
    ]

    if (!localStorage.getItem("notes")) {
        localStorage.setItem("notes", JSON.stringify(note));
    }
}