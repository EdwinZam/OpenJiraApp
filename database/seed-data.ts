
interface SeedData{
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}

export const seedData: SeedData = {
    entries:[
        {   
            description: 'Pendiente: Adipisicing qui ullamco duis ipsum.',
            status: 'pending',
            createAt: Date.now(),
        },
        {   
            description: 'In-Progress: Fugiat do aliqua duis nulla anim ipsum quis Lorem.',
            status: 'in-progress',
            createAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Proident deserunt sint cupidatat veniam dolor voluptate exercitation fugiat non laboris dolor nostrud non.',
            status: 'finished',
            createAt: Date.now() - 100000 ,
        }
    ]

}