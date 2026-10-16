import type { Category, Effect } from './catalog';

type CommandGroup = {
  id: string;
  name: string;
  description: string;
  icon: string;
  tint: string;
  effects: string;
};

// Each line is command|display name|description. IDs match the supplied slash commands.
const groups: CommandGroup[] = [
  {
    id: 'paparazzi', name: 'Paparazzi e celebridades', description: 'Estilo de estrela', icon: 'flash-outline', tint: '#F3D8D2',
    effects: `paparazzi|Paparazzi|Foto espontânea de celebridade
celebrity|Celebridade|Retrato de pessoa famosa
redcarpet|Tapete vermelho|Tapete vermelho
hollywood|Hollywood|Estilo estrela de Hollywood
flashphotography|Flash direto|Flash direto e intenso
nightpaparazzi|Paparazzi à noite|Paparazzi durante a noite
candid|Espontânea|Fotografia espontânea
streetcelebrity|Estrela nas ruas|Celebridade pelas ruas
airportlook|Visual de aeroporto|Visual de celebridade no aeroporto
magazinecover|Capa de revista|Capa de revista`,
  },
  {
    id: 'cameras-vintage', name: 'Câmeras e vintage', description: 'Filmes e nostalgia', icon: 'camera-outline', tint: '#EADAC6',
    effects: `vintage|Vintage|Fotografia antiga
vintagephotography|Vintage realista|Fotografia vintage realista
polaroid|Polaroid|Câmera instantânea
kodak|Filme Kodak|Filme Kodak
fujifilm|Filme Fujifilm|Cores de filme Fujifilm
35mm|Filme 35 mm|Filme analógico 35 mm
analog|Analógica|Fotografia analógica
disposablecamera|Câmera descartável|Câmera descartável
digicam|Digicam|Câmera digital dos anos 2000
filmgrain|Grão de filme|Granulação de filme`,
  },
  {
    id: 'perspectives', name: 'GoPro e perspectivas', description: 'Outro ponto de vista', icon: 'aperture-outline', tint: '#D6E6EC',
    effects: `gopro|GoPro|Câmera de ação grande-angular
fisheye|Olho de peixe|Lente olho de peixe
ultrawide|Ultra-wide|Lente ultragrande-angular
pov|POV|Visão em primeira pessoa
selfie|Selfie|Fotografia selfie
drone|Drone|Fotografia aérea
lowangle|Ângulo baixo|Fotografia de baixo para cima
topdown|Vista de cima|Câmera vista de cima
wideangle|Grande-angular|Perspectiva ampla
actionshot|Foto de ação|Fotografia de ação`,
  },
  {
    id: 'cinema', name: 'Cinema e filmes', description: 'Cenas marcantes', icon: 'film-outline', tint: '#DDD9ED',
    effects: `cinematic|Cinematográfica|Fotografia cinematográfica
filmlook|Película|Aparência de película
anamorphic|Anamórfica|Lente anamórfica
noir|Cinema noir|Cinema noir
bladerunner|Ficção neon|Ficção científica neon
cyberpunk|Cyberpunk|Futurismo urbano
matrix|Matrix|Estética Matrix
wesanderson|Simetria pastel|Composição simétrica e cores pastel
dramaticlighting|Luz dramática|Iluminação dramática
movieposter|Pôster de cinema|Pôster cinematográfico`,
  },
  {
    id: 'luxury', name: 'Luxo, moda e lifestyle', description: 'Editorial e elegância', icon: 'diamond-outline', tint: '#F0DDE4',
    effects: `oldmoney|Old money|Luxo clássico e discreto
quietluxury|Luxo discreto|Elegância minimalista
billionaire|Bilionário|Estética de bilionário
luxurylifestyle|Vida de luxo|Vida de luxo
fashioneditorial|Editorial de moda|Editorial de moda
vogue|Revista de moda|Estética de revista de moda
streetwear|Streetwear|Moda urbana
modelshoot|Ensaio de modelo|Ensaio de modelo
runway|Passarela|Fotografia de passarela
luxuryhotel|Hotel de luxo|Fotografia em hotel de luxo`,
  },
  {
    id: 'lighting', name: 'Iluminação profissional', description: 'A luz muda tudo', icon: 'sunny-outline', tint: '#F2E4BE',
    effects: `goldenhour|Hora dourada|Luz dourada do pôr do sol
bluehour|Hora azul|Luz azul do entardecer
softlight|Luz suave|Iluminação suave
hardlight|Luz intensa|Luz intensa e sombras fortes
rimlight|Luz de contorno|Contorno de luz
studiolighting|Luz de estúdio|Iluminação de estúdio
neonlights|Luzes neon|Luzes neon coloridas
candlelight|Luz de velas|Iluminação de velas
sunflare|Reflexo solar|Reflexo de luz solar
lowkey|Low key|Fotografia escura e dramática`,
  },
  {
    id: 'social-2000', name: 'Redes sociais e anos 2000', description: 'Ícones da internet', icon: 'phone-portrait-outline', tint: '#D7E9E8',
    effects: `y2k|Y2K|Estética dos anos 2000
2000scamera|Câmera anos 2000|Câmera digital antiga
90saesthetic|Anos 90|Estética dos anos 90
vhs|VHS|Gravação VHS
camcorder|Filmadora|Filmadora antiga
flashfilter|Flash de festa|Flash direto de festa
tumblr|Tumblr|Estética Tumblr
myspace|MySpace|Estética MySpace
scrapbook|Scrapbook|Colagem de lembranças
nostalgia|Nostalgia|Fotografia nostálgica`,
  },
  {
    id: 'professional-portrait', name: 'Retratos profissionais', description: 'Presença em cada olhar', icon: 'person-circle-outline', tint: '#E5DED7',
    effects: `professionalportrait|Retrato profissional|Retrato profissional
headshot|Headshot|Foto de perfil corporativo
blackandwhite|Preto e branco|Preto e branco
fineart|Fine art|Fotografia artística
beautyshot|Retrato de beleza|Retrato de beleza
closeup|Close-up|Fotografia aproximada
bokeh|Bokeh|Fundo desfocado
shallowdepth|Profundidade rasa|Profundidade de campo reduzida
highcontrast|Alto contraste|Alto contraste
hyperrealistic|Hiper-realista|Realismo fotográfico acentuado`,
  },
  {
    id: 'creative-effects', name: 'Criativos e artísticos', description: 'Experimente o inesperado', icon: 'color-palette-outline', tint: '#E6DAEC',
    effects: `doubleexposure|Dupla exposição|Dupla exposição
motionblur|Desfoque de movimento|Desfoque de movimento
longexposure|Longa exposição|Longa exposição
surreal|Surreal|Fotografia surrealista
dreamcore|Dreamcore|Ambiente de sonho
liminalspace|Espaço liminar|Espaços vazios e misteriosos
glitch|Glitch|Distorção digital
tiltshift|Tilt-shift|Efeito de miniatura
infrared|Infravermelho|Fotografia infravermelha
duotone|Duotone|Imagem com duas tonalidades`,
  },
  {
    id: 'ai-transform', name: 'Transformações com IA', description: 'Novas versões de você', icon: 'sparkles-outline', tint: '#DDE0F1',
    effects: `actionfigure|Boneco colecionável|Boneco colecionável
toybox|Boneco na caixa|Boneco dentro da embalagem
3davatar|Avatar 3D|Avatar tridimensional
anime|Anime|Personagem de anime
ghibli|Animação artesanal|Estética de animação japonesa artesanal
pixar|Animação 3D|Estética de animação 3D
comicbook|Quadrinhos|História em quadrinhos
claymation|Massinha|Animação de massinha
retroanime|Anime retrô|Anime dos anos 80/90
fantasyportrait|Retrato de fantasia|Retrato de fantasia`,
  },
];

const categoryAssets: Record<string, number> = {
  paparazzi: require('../../assets/categories/paparazzi.png'),
  'cameras-vintage': require('../../assets/categories/cameras-vintage.png'),
  perspectives: require('../../assets/categories/perspectives.png'),
  cinema: require('../../assets/categories/cinema.png'),
  luxury: require('../../assets/categories/luxury.png'),
  lighting: require('../../assets/categories/lighting.png'),
  'social-2000': require('../../assets/categories/social-2000.png'),
  'professional-portrait': require('../../assets/categories/professional-portrait.png'),
  'creative-effects': require('../../assets/categories/creative-effects.png'),
  'ai-transform': require('../../assets/categories/ai-transform.png'),
};

export const commandCategories: Category[] = groups.map(({ id, name, description, icon, tint }) => ({ id, name, description, icon, tint, coverUrl: '', coverAsset: categoryAssets[id] }));
export const commandEffects: Effect[] = groups.flatMap(group => group.effects.split('\n').map(line => {
  const [id, name, description] = line.split('|');
  return { id, name, description, categoryId: group.id, tags: [id, name, description, `/${id}`], costCredits: 1, inputCount: 1, quality: ['standard'], exampleUrls: [] };
}));
