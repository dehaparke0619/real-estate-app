const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const categories = [
    'Daire',
    'Villa',
    'Arsa',
    'Ofis',
    'Müstakil Ev',
    'Residans',
];

const locations = [
    'İstanbul, Kadıköy', 'İstanbul, Beşiktaş', 'İstanbul, Şişli', 'İstanbul, Beylikdüzü',
    'Ankara, Çankaya', 'Ankara, Keçiören',
    'İzmir, Karşıyaka', 'İzmir, Bornova',
    'Antalya, Muratpaşa', 'Antalya, Konyaaltı',
    'Bursa, Nilüfer',
];

const titles = [
    'Lüks Daire', 'Deniz Manzaralı Villa', 'Merkezi Konumda Ofis', 'Yatırımlık Arsa',
    'Geniş Aile Evi', 'Modern Residans', 'Bahçeli Müstakil Ev', 'Uygun Fiyatlı Daire',
];

async function main() {
    console.log('Seeding database...');

    // 1. Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });
    console.log({ admin });

    // 2. Create Categories
    for (const categoryName of categories) {
        await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName },
        });
    }
    console.log('Categories created.');

    // 3. Create 50 Mock Properties
    const allCategories = await prisma.category.findMany();

    if (allCategories.length === 0) {
        console.error("No categories found, cannot seed properties.");
        return;
    }

    // Clear existing properties to avoid duplicates if re-run (optional, but good for dev)
    // await prisma.property.deleteMany(); 

    for (let i = 0; i < 50; i++) {
        const category = allCategories[Math.floor(Math.random() * allCategories.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const title = titles[Math.floor(Math.random() * titles.length)];
        const price = Math.floor(Math.random() * 10000000) + 1000000; // 1M - 11M

        await prisma.property.create({
            data: {
                title: `${title} ${i + 1}`,
                description: `Bu harika mülk ${location} konumunda bulunuyor. Geniş ve ferah yaşam alanı sunuyor. Detaylar için arayınız.`,
                price: price,
                location: location,
                images: JSON.stringify(['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80']),
                note: `Mülk sahibi ile görüşüldü. İlan no: ${i + 1}`,
                categoryId: category.id,
            },
        });
    }

    console.log('50 Mock properties created.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
