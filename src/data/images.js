const unsplash = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`

export const photo = unsplash

export const buildGallery = (title, ids) =>
  ids.map((id, index) => ({ src: unsplash(id), alt: `${title}, photo ${index + 1}` }))

export const IMAGES = {
  hero: 'photo-1600585154340-be6161a56a0c',
  exteriors: [
    'photo-1600585154340-be6161a56a0c',
    'photo-1600596542815-ffad4c1539a9',
    'photo-1600566753190-17f0baa2a6c3',
    'photo-1600573472592-401b489a3cdc',
    'photo-1564013799919-ab600027ffc6',
    'photo-1613490493576-7fde63acd811',
  ],
  towers: [
    'photo-1545324418-cc1a3fa10c00',
    'photo-1460317442991-0ec209397118',
    'photo-1515263487990-61b07816b324',
    'photo-1558036117-15d82a90b9b1',
  ],
  interiors: [
    'photo-1600607687939-ce8a6c25118c',
    'photo-1502672260266-1c1ef2d93688',
    'photo-1522708323590-d24dbb6b0267',
    'photo-1560448204-e02f11c3d0e2',
    'photo-1493809842364-78817add7ffb',
    'photo-1556228453-efd6c1ff04f6',
  ],
  commercial: ['photo-1486406146926-c627a92ad1ab', 'photo-1497366216548-37526070297c'],
  land: ['photo-1500382017468-9049fed747ef'],
}
