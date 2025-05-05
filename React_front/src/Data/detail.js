const detail = [
    {
        id: 1,
        number: 1,
        color: ["black and yellow", "black", "white"],
        size: ["S","M","L","XL"],
        desc_en: "V-neck T-shirt, with a sporty style, cool vibe, and featuring letters on the clothes.",
        desc_cn: "V领T恤，时尚运动风格，酷炫气质，衣服上印有字母。",
        color_mapping: {
        }
    },
    {
        id: 2,
        number: 2,
        color: ["beige","black"],
        size: ["M","L","XL","XXL"],
        desc_en: "Round-neck T-shirt, cute style, sweet, for daily wear",
        desc_cn: "圆领T恤，可爱风格，甜美，日常穿搭。",
        color_mapping: {
        }
    },
    {
        id: 3,
        number: 3,
        color: ["dark_grey", "light_grey"],
        size: ["S","M","L","XL","XXL"],
        desc_en: "Product 1",
        desc_cn: "产品1",
        color_mapping: {
            "dark_grey": {
                "code": "#404040",
                "name_cn": "深灰色"
            },
            "light_grey": {
                "code": "#D3D3D3",
                "name_cn": "浅灰色"
            }
        }
    },
    {
        id: 4,      
        number: 4,
        color: ["pink","mint_green"],
        size: ["S","M","L"],
        desc_en: "Low-cut casual style, cute and playful girl outfit",
        desc_cn: "低领休闲风格，可爱且活泼的女孩装扮。",
        color_mapping: {
            "mint_green": {
                "code": "#98FF98",
                "name_cn": "薄荷绿"
            }
        }
    },
    {
        id: 5,
        number: 5,
        color: ["blue and white","red and white","yellow and blue"],
        size: ["M","L","XL"],
        desc_en: "Sporty and cool style, printed with letters, versatile and suitable for all occasions.",
        desc_cn: "时尚且适合各种场合的运动风格，印有字母。",
        color_mapping: {
        }
    },
    {
        id: 6,
        number: 1,
        color: ["white","black"],
        size: ["S","M","L","XL"],
        desc_en: "Daily sweet girl's dress",
        desc_cn: "日常甜美女孩连衣裙",
        color_mapping: {
        }
    },
    {
        id: 7,
        number: 2,
        color: ["pink"],
        size: ["M","L","XL","XXL"],
        desc_en: "Flowers suitable for taking photos and a sweet dress",
        desc_cn: "适合拍照的甜美花朵连衣裙",
        color_mapping: {
        }
    },
    {
        id: 8,
        number: 3,
        color: ["white"],
        size: ["S","M","L"],
        desc_en: "A cute puffy dress printed with cats",
        desc_cn: "可爱蓬松的猫咪印花连衣裙",
        color_mapping: {
        }
    },
    {
        id: 9,
        number: 1,
        color: ["black","red"],
        size: ["L","XL","XXL"],
        desc_en: "Sporty style white stripe jacket",
        desc_cn: "时尚白色条纹夹克",
        color_mapping: {
        }
    },
    {
        id: 10,
        number: 2,
        color: ["light_purple","light_blue"],
        size: ["M","L","XL","XXL"],
        desc_en: "Shirt-style casual jacket",
        desc_cn: "衬衫风格休闲夹克",
        color_mapping: {
            "light_purple": {
                "code": "#D3D3D3",
                "name_cn": "浅紫色"
            },
            "light_blue": {
                "code": "#D3D3D3",
                "name_cn": "浅蓝色"
            }
        }
    },
    {
        id: 11,
        number: 3,
        color: ["white","black","brown"],
        size: ["S","M","L","XL","XXL"],
        desc_en: "Thick and versatile long-sleeved jacket",
        desc_cn: "保暖百搭长袖夹克",
        color_mapping: {
        }
    },
    {
        id: 12,
        number: 4,
        color: ["black","white","olive_green"],
        size: ["S","M","L","XL","XXL"],
        desc_en: "A jacket with a zipper and a hood",
        desc_cn: "拉链和连帽夹克",
        color_mapping: {
            "olive_green": {
                "code": "#808000",
                "name_cn": "橄榄绿"
            }
        }
    },
    {
        id: 13,
        number: 1,
        color: ["apricot","black","light_blue"],
        size: ["S","M","L","XL","XXL"],
        desc_en: "Casual and versatile wide-leg pants",
        desc_cn: "休闲百搭长裤",
        color_mapping: {
            "light_blue": {
                "code": "#D3D3D3",
                "name_cn": "浅蓝色"
            }
        }
    },
    {
        id: 14,
        number: 1,
        color: ["black","blue"],
        size: [],
        desc_en: "Crocodile leather, chain shoulder bag, fashionable",
        desc_cn: "鳄鱼皮，链条肩包，时尚",
        color_mapping: {
        }
    },
    {
        id: 15,
        number: 2,
        color: ["red","blue","black"],
        size: [],
        desc_en: "Premium quality leather strap handbag made of crocodile skin",
        desc_cn: "优质鳄鱼皮链条肩包",
        color_mapping: {
        }
    },
    {
        id: 16,
        number: 1,
        color: ["red","black"],
        size: [],
        desc_en: "Cool Shark Pattern, Washed Denim Material Baseball Cap",
        desc_cn: "酷酷鲨鱼图案，水洗牛仔料子的鸭舌帽",
        color_mapping: {
        }
    },
    {
        id: 17,
        number: 1,
        color: ["yellow","black","camouflage"],
        size: [],
        desc_en: "Casual letter-style baseball cap",
        desc_cn: "休闲字母鸭舌帽",
        color_mapping: {
        }
    },
    {
        id: 18,
        number: 1,
        color: ["black","brown","khaki"],
        size: [],
        desc_en: "Long wind coat with a wide collar",
        desc_cn: "长风衣，宽领",
        color_mapping: {
        }
    },
    {
        id: 19,
        number: 2,
        color: ["brown"],
        size: [],
        desc_en: "Short style fashion waist belt coat",
        desc_cn: "短款时尚腰带风衣",
        color_mapping: {
        }

    }
]   
