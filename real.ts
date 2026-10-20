/* Толькі праўдзівыя, правяраныя матэрыялы:
   фота і сканы — Wikimedia Commons (public domain / вольныя ліцэнзіі),
   відэа/аўдыё — рэальныя запісы на YouTube і ў адкрытых бібліятэках,
   тэксты вершаў — грамадскі набытак (аўтар памёр у 1917 г.). */

const FP = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export type RealPhoto = {
  src: string;
  page: string;
  caption: string;
  credit: string;
};

export const realPhotos: Record<string, RealPhoto> = {
  portrait: {
    src: `${FP}Bagdanovich_M_2.jpg?width=800`,
    page: "https://commons.wikimedia.org/wiki/File:Bagdanovich_M_2.jpg",
    caption: "Фотаздымак Максіма Багдановіча, каля 1910–1911 гг.",
    credit: "Wikimedia Commons • аўтар невядомы • public domain",
  },
  vianokCover: {
    src: `${FP}Maksim%20Bahdanovi%C4%8D%20-%20Vianok.jpg?width=1000`,
    page: "https://commons.wikimedia.org/wiki/File:Maksim_Bahdanovi%C4%8D_-_Vianok.jpg",
    caption: "Вокладка зборніка «Вянок» (факсімільнае выданне з арыгінала 1914 г., Вільня, друкарня Марціна Кухты)",
    credit: "Wikimedia Commons • public domain",
  },
  manuscriptTkachyhi: {
    src: `${FP}Maksim%20Bahdanovi%C4%8D%20-%20S%C5%82uckije%20tka%C4%8Dychi.jpg?width=1000`,
    page: "https://commons.wikimedia.org/wiki/Category:Vianok",
    caption: "Старонка са зборніка «Вянок»: верш «Слуцкія ткачыхі» (1912)",
    credit: "Wikimedia Commons • скан выдання 1914 г. • public domain",
  },
  manuscriptRomans: {
    src: `${FP}Maksim%20Bahdanovi%C4%8D%20-%20Romans.jpg?width=1000`,
    page: "https://commons.wikimedia.org/wiki/Category:Vianok",
    caption: "Старонка са зборніка «Вянок»: раманс «Зорка Венера»",
    credit: "Wikimedia Commons • скан выдання 1914 г. • public domain",
  },
  manuscriptZimoj: {
    src: `${FP}Maksim%20Bahdanovi%C4%8D%20-%20Zimoj.jpg?width=1000`,
    page: "https://commons.wikimedia.org/wiki/Category:Vianok",
    caption: "Старонка са зборніка «Вянок»: верш «Зімой»",
    credit: "Wikimedia Commons • скан выдання 1914 г. • public domain",
  },
  vianok1927: {
    src: `${FP}%D0%92%D1%8F%D0%BD%D0%BE%D0%BA%20(1927).%20%D0%9C%D0%B0%D0%BA%D1%81%D1%96%D0%BC%20%D0%91%D0%B0%D0%B3%D0%B4%D0%B0%D0%BD%D0%BE%D0%B2%D1%96%D1%87.jpg?width=800`,
    page: "https://commons.wikimedia.org/wiki/Category:Maksim_Bahdanovich",
    caption: "Другое выданне «Вянка», Вільня, 1927 г. (выдавецтва Б. Клецкіна, прадмова Ант. Навіны)",
    credit: "Wikimedia Commons • public domain",
  },
  minskHouse: {
    src: `${FP}%D0%A2%D0%B2%D0%BE%D1%80%D1%8B%20%D0%9C.%20%D0%91%D0%B0%D0%B3%D0%B4%D0%B0%D0%BD%D0%BE%D0%B2%D1%96%D1%87%D0%B0%20(1927%E2%80%941928).%20%D0%A2%D0%BE%D0%BC%20II.%20%D0%94%D0%BE%D0%BC%20%D0%9C%D0%B0%D0%BA%D1%81%D1%96%D0%BC%D0%B0%20%D0%91%D0%B0%D0%B3%D0%B4%D0%B0%D0%BD%D0%BE%D0%B2%D1%96%D1%87%D0%B0%20%D1%9E%20%D0%9C%D0%B5%D0%BD%D1%81%D0%BA%D1%83.png?width=1000`,
    page: "https://commons.wikimedia.org/wiki/Category:Maksim_Bahdanovich",
    caption: "Дом Багдановічаў у Мінску. Ілюстрацыя з выдання «Творы М. Багдановіча», том II (1927–1928)",
    credit: "Wikimedia Commons • public domain",
  },
  museumMinsk: {
    src: `${FP}Belarus-Minsk-Maksim%20Bahdanovich%20Museum.jpg?width=1000`,
    page: "https://commons.wikimedia.org/wiki/Category:Maksim_Bahdanovich_Museum,_Minsk",
    caption: "Літаратурны музей Максіма Багдановіча ў Мінску (вул. М. Багдановіча, 7а)",
    credit: "Wikimedia Commons • CC BY-SA",
  },
  museumGrodno: {
    src: `${FP}%D0%94%D0%BE%D0%BC-%D0%BC%D1%83%D0%B7%D0%B5%D0%B9%20%D0%9C%D0%B0%D0%BA%D1%81%D1%96%D0%BC%D0%B0%20%D0%91%D0%B0%D0%B3%D0%B4%D0%B0%D0%BD%D0%BE%D0%B2%D1%96%D1%87%D0%B0.jpg?width=1000`,
    page: "https://commons.wikimedia.org/wiki/Category:Maksim_Bahdanovich_Museum,_Grodno",
    caption: "Дом-музей Максіма Багдановіча ў Гродне (вул. 1 Мая, 10) — дом, пабудаваны ў 1888 г., дзе жыла сям'я ў 1892–1896 гг.",
    credit: "Wikimedia Commons • CC BY-SA",
  },
  zelenya: {
    src: `${FP}%D0%A0%D1%83%D0%BA%D0%B0%D0%BF%D1%96%D1%81%20%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%8F%201.jpg?width=800`,
    page: "https://commons.wikimedia.org/wiki/Category:Maksim_Bahdanovich_Museum,_Minsk",
    caption: "Рукапіс зборніка «Зеляня» (1909–1913) — рукапісуны зборнік маладога Багдановіча",
    credit: "Літаратурны музей М. Багдановіча, Мінск • Wikimedia Commons",
  },
};

export type RealVideo = {
  yt: string;
  title: string;
  who: string;
  desc: string;
};

export const realVideos: RealVideo[] = [
  {
    yt: "F-8jwx86ik8",
    title: "«Слуцкія ткачыхі» — ансамбль «Песняры»",
    who: "Музыка У. Мулявіна (1970-я) • словы М. Багдановіча (1912)",
    desc: "Тая самая песня, якую ведае кожны беларус. Запіс канцэртнага выканання.",
  },
  {
    yt: "YNdKXMX5BdU",
    title: "«Пагоня» — «Песняры», 1993",
    who: "Словы М. Багдановіча (1916) • музыка М. Шчаглова-Куліковіча",
    desc: "Рок-версія верша-гімна. У 2020-м «Пагоню» спявалі метро, вакзалы і плошчы.",
  },
  {
    yt: "YM2mrnIWmKw",
    title: "«Зорка Венера» — Маргарыта Ляўчук і Андрэй Павук",
    who: "Сучаснае выкананне да дня памяці паэта (25 траўня)",
    desc: "Як гучыць Багдановіч сёння: оперны голас і гітара.",
  },
  {
    yt: "TRA46uavaY0",
    title: "«Слуцкія ткачыхі» чытае Алена Спірыдовіч",
    who: "Праект «Мой Багдановіч», тэлеканал «Беларусь 3»",
    desc: "Заслужаная артыстка Беларусі чытае галоўны верш «Старой Беларусі».",
  },
];

export type DocLink = { title: string; where: string; url: string; desc: string };

export const docLinks: DocLink[] = [
  {
    title: "Поўны тэкст «Вянка»",
    where: "Вікікрыніцы (be.wikisource.org)",
    url: "https://be.wikisource.org/wiki/Аўтар:Максім_Багдановіч",
    desc: "Усе вершы зборніка і іншыя творы — свабодна, правер кожны радок.",
  },
  {
    title: "Аўдыякніга: вершы голасам",
    where: "Kamunikat.org — Беларуская інтэрнэт-бібліятэка",
    url: "https://kamunikat.org/vershy-bagdanovich-maksim",
    desc: "Сапраўдныя mp3-запісы: «Зорка Венера», «Пагоня», «Слуцкія ткачыхі» і іншыя. Можна слухаць і спампоўваць.",
  },
  {
    title: "«Вянок» 1913 года ў архіве",
    where: "Беларускі дзяржаўны архіў-музей літаратуры і мастацтва",
    url: "https://bdamlm.by/navukova-davedachny-aparat/skarbnitsa/item/2087-vyanok",
    desc: "Афіцыйны архіўны запіс: Вільня, друкарня Марціна Кухты, 120 старонак.",
  },
  {
    title: "Біяграфія з музея",
    where: "Літаратурны музей М. Багдановіча, Мінск",
    url: "https://bagdanovichmuseum.by/biyagrafiya/",
    desc: "Даты, сям'я, рукапісы — ад людзей, якія захоўваюць спадчыну паэта.",
  },
  {
    title: "Гісторыя «Пагоні»",
    where: "«Наша Ніва» — артыкул пра беларускія гімны",
    url: "https://nashaniva.com/391224",
    desc: "Чаму верш 1916 года стаў песняй пратэстаў і сабраў мільён праглядаў.",
  },
  {
    title: "Артыкул пра асобу і творчасць",
    where: "Архівы Беларусі (archives.gov.by)",
    url: "https://archives.gov.by/en/welcome-to-the-archives-of-belarus-website/subject-guides-to-archival-records/famous-people/to-the-120th-anniversary-of-the-birthday/maksim-bahdanovich-personality-and-work",
    desc: "Дзяржаўны архіў: рукапісы, цыклы, пераклады, оперы паводле вершаў.",
  },
];

export type PoemReal = {
  id: string;
  title: string;
  year: string;
  note: string;
  text: string;
  full: boolean;
  about: string;
  music: string;
};

export const poemsReal: PoemReal[] = [
  {
    id: "venera",
    title: "Зорка Венера",
    year: "1912",
    note: "Раманс • прысвечаны Ганне Какуевай",
    text: `Зорка Венера ўзышла над зямлёю,
Светлыя згадкі з сабой прывяла…
Помніш, калі я спаткаўся з табою,
Зорка Венера ўзышла.

З гэтай пары я пачаў углядацца
Ў неба начное і зорку шукаў.
Ціхім каханнем к табе загарэцца
З гэтай пары я пачаў.

Але расстацца нам час наступае;
Пэўна, ўжо доля такая ў нас.
Моцна кахаў я цябе, дарагая,
Але расстацца нам час наступае…

Буду ў начы адзінока стаяці —
Цёмная ноч, хоць бы зорку паслаць…
Зорка Венера ўзышла над зямлёю —
Помніш, калі я спаткаўся з табою?`,
    full: true,
    about: "Верш пра каханне да Ганны Какуевай — сястры яраслаўскага сябра паэта. Доўга лічыўся народнай песняй; музыку напісаў кампазітар Сымон Рак-Міхайлоўскі. Паводле верша створана опера «Зорка Венера» Юрыя Семянякі.",
    music: "Слухай вышэй: выкананне М. Ляўчук і А. Павука.",
  },
  {
    id: "tkachyhi",
    title: "Слуцкія ткачыхі",
    year: "1912",
    note: "Цыкл «Старая Беларусь»",
    text: `Ад родных ніў, ад роднай хаты
У панскі двор дзеля красы
Яны, бяздольныя, ўзяты
Ткаць залатыя паясы.

І цягам доўгія часіны,
Дзявочыя забыўшы сны,
Свае шырокія тканіны
На лад персідскі ткуць яны.

А за сцяной смяецца поле,
Зіяе неба з-за акна, —
І думкі мкнуцца мімаволі
Туды, дзе расцвіла вясна;

Дзе блішча збожжа ў яснай далі,
Сінеюць міла васількі,
Халодным срэбрам ззяюць хвалі
Між гор ліючайся ракі;

Цямнее край зубчаты бора…
І тчэ, забыўшыся, рука
Заміж персідскага ўзора
Цвяток радзімы васілька.`,
    full: true,
    about: "Напісаны пасля наведвання музея братоў Луцкевічаў у Вільні, дзе паэт убачыў сапраўдныя слуцкія паясы. Прыгонныя ткачыхі таемна ўшываюць у чужы ўзор родны васілёк — сімвал нескаронасці культуры.",
    music: "Музыку напісаў Уладзімір Мулявін («Песняры») — глядзі відэа вышэй.",
  },
  {
    id: "pahonya",
    title: "Пагоня",
    year: "1916",
    note: "Верш-гімн • напісаны ў Мінску",
    text: `Толькі ў сэрцы трывожным пачую
За краіну радзімую жах, —
Ўспомню Вострую Браму святую
І ваякаў на грозных канях.

Ў белай пене праносяцца коні, —
Рвуцца, мкнуцца і цяжка хрыпяць…
Старадаўняй Літоўскай Пагоні
Не разбіць, не спыніць, не стрымаць!

У бязмерную даль вы ляціце,
А за вамі, прад вамі — гады.
Вы за кім у пагоню спяшыце?
Дзе шляхі вашы йдуць і куды?

Мо яны Беларусь, запушчану,
Недаступную й заспавану,
Прабудзіць хочуць, клікаці: «Ўстань!
Бі на ворага! Рвіся да зброі!»

Маці родная! Ты іх убачыш?
Іх пачуеш, іх кліч, іх імпэт?
Дык сцяг вайны ўзнімі вышэй, значыць,
Кліч: «Наперад! За волю! Услед!»`,
    full: true,
    about: "Зварот да гераічнага мінулага ВКЛ і заклік да абуджэння. Музыку a cappella напісаў Мікола Шчаглоў-Куліковіч. У 1990-я разглядаўся як варыянт гімна; у 2020-м стаў гімнам пратэстаў.",
    music: "Слухай: «Песняры» (1993) — відэа вышэй.",
  },
  {
    id: "kraj",
    title: "Краю мой родны!.. (пачатак)",
    year: "1910",
    note: "Праграмны верш веры ў будучыню",
    text: `Краю мой родны! Як выкляты Богам —
Столькі ты зносіш нядолі!
Хмурна павісла над родным разлогам
Хмара халодная болі…`,
    full: false,
    about: "Гэта толькі першая страфа — пачатак аднаго з самых вядомых грамадзянскіх вершаў. Паэту 19 гадоў, а ён ужо піша як прарок: цемра мінецца, будзе світанак.",
    music: "Поўны тэкст — на Вікікрыніцах (спасылка ў раздзеле «Дакументы»).",
  },
];
