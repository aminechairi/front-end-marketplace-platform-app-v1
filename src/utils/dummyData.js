export const categories = async () => {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return {
    result: 14,
    paginationResults: {
      currentPage: 1,
      limit: 50,
      numberOfPages: 1,
    },
    data: [
      {
        _id: "65467dcc9ad1fc81a9e8ddb3",
        name: "mahali",
        slug: "mahali",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-f3421f63-d02f-4e66-9b6d-8b588e8cb657-1699118540267.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=5ca36dfbc971af90c3bc78c891744ea8a2436ec551a0c252320a170e2eeedaaf&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:22:20.293Z",
        updatedAt: "2023-11-04T17:22:20.293Z",
      },
      {
        _id: "65467cd79ad1fc81a9e8ddad",
        name: "music, movies & tv shows",
        slug: "music-movies-and-tv-shows",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-b6a3c642-8c9c-4640-9ed6-6a8a8d375a95-1699118295285.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=5ae52516e80af093f88d2040d54d1052537b6a135ea9066bc1f85a17daadd60f&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:18:15.318Z",
        updatedAt: "2023-11-04T17:18:15.318Z",
      },
      {
        _id: "65467bfb9ad1fc81a9e8dda9",
        name: "office supplies & stationery",
        slug: "office-supplies-and-stationery",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-5593ec23-d42c-4565-b26e-09e2105826d6-1699118075608.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=c020bb8658006381bd89b3491cd1c4ddab53fa1e14ef5880f0f3c7ddf5343218&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:14:35.638Z",
        updatedAt: "2023-11-04T17:14:35.638Z",
      },
      {
        _id: "65467ba39ad1fc81a9e8dda5",
        name: "pet supplies",
        slug: "pet-supplies",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-4e419a89-af58-4069-8efe-c77f315efaa9-1699117987546.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=03301bd2ad83baa1241a76a9b34ce9c859af79df2a270021d71c6e2563939d6f&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:13:07.579Z",
        updatedAt: "2023-11-04T17:13:07.579Z",
      },
      {
        _id: "65467b279ad1fc81a9e8dda1",
        name: "tools & home improvement",
        slug: "tools-and-home-improvement",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-f9855c10-7512-44d2-b572-1c90b520926a-1699117863593.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=9d7a46eb183f503bdde446d86260a7871c8b67f47da07d78b4431c7d7a83f608&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:11:03.629Z",
        updatedAt: "2023-11-04T17:11:03.629Z",
      },
      {
        _id: "65467acb9ad1fc81a9e8dd9d",
        name: "automotive",
        slug: "automotive",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-f1c45963-a731-4256-845e-2223e49ef389-1699117771256.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=a51855f0379c9152188cca2a835a62415b963818512347633fb68c2dcc51ce76&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:09:31.313Z",
        updatedAt: "2023-11-04T17:09:31.313Z",
      },
      {
        _id: "65467a679ad1fc81a9e8dd99",
        name: "health & nutrition",
        slug: "health-and-nutrition",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-f1d49024-8cc3-445d-907c-e5be1a74db05-1699117671341.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=d4dd39c99a8a1fc3c7bf9602b79b0a53419c6f914c02e6e6e08705af942f61ae&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:07:51.371Z",
        updatedAt: "2023-11-04T17:07:51.371Z",
      },
      {
        _id: "654679169ad1fc81a9e8dd91",
        name: "baby products",
        slug: "baby-products",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-d29a6402-feb0-4575-ad38-358bd1f290b5-1699117426044.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=121251b59aadb25604530a575a7ebb28af811f7aacebe1f4ca77dbc340c0b14f&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T17:02:14.035Z",
        updatedAt: "2023-11-04T17:03:46.077Z",
      },
      {
        _id: "654678899ad1fc81a9e8dd8d",
        name: "toys & games",
        slug: "toys-and-games",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-529cc791-60b0-487a-b425-93e718fad126-1699117193729.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=a7f498bc1ef88295c562098b6f926c625a3a87b73661fb537481887bfcc84a89&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T16:59:53.759Z",
        updatedAt: "2023-11-04T16:59:53.759Z",
      },
      {
        _id: "654677c59ad1fc81a9e8dd87",
        name: "sports & outdoors",
        slug: "sports-and-outdoors",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-477c0630-be27-4986-b546-4ed32cfab350-1699116997664.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=487763a944d403004885e613570bb8c9c2f91fabaeb57b7113fc6ec4c911ef07&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T16:56:37.690Z",
        updatedAt: "2023-11-04T16:56:37.690Z",
      },
      {
        _id: "654676229ad1fc81a9e8dd83",
        name: "home & kitchen",
        slug: "home-and-kitchen",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-37dea72a-cfc0-4cf6-868d-a3a9a22853ab-1699116577838.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=c454f50cd8d878f08732cd2ce17e6a8f8afab051822a3374af869d040526330a&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T16:49:38.111Z",
        updatedAt: "2023-11-04T16:49:38.111Z",
      },
      {
        _id: "654675609ad1fc81a9e8dd7f",
        name: "fashion",
        slug: "fashion",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-19323285-f10c-4739-bf9e-57c28c64c0fa-1699116384385.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=bc7ee6beb38bda575243f00980642739a982727cdc80340ca5a9f66dea25479f&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T16:46:24.411Z",
        updatedAt: "2023-11-04T16:46:24.411Z",
      },
      {
        _id: "654674d89ad1fc81a9e8dd7b",
        name: "beauty & fragrances",
        slug: "beauty-and-fragrances",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-40bd9fd8-8148-4993-b568-602d65dab5f6-1699116248044.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=e6d0643e7967201980135be46c8bdbe1c6c43f35b75208374a33fc4f4480c034&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T16:44:08.319Z",
        updatedAt: "2023-11-04T16:44:08.319Z",
      },
      {
        _id: "6546743c9ad1fc81a9e8dd77",
        name: "electronics & mobiles",
        slug: "electronics-and-mobiles",
        image:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/categories/category-7e619493-5cd1-4e35-a236-d6e29894c74c-1699116091683.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T115049Z&X-Amz-Expires=3600&X-Amz-Signature=ef11fe6b29f9609d8da12a66ee2fc6c53db015104da3c09e67dfd6a2b5ba4506&X-Amz-SignedHeaders=host&x-id=GetObject",
        createdAt: "2023-11-04T16:41:32.028Z",
        updatedAt: "2023-11-04T16:41:32.028Z",
      },
    ],
  };
};

export const products = async () => {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  return {
    result: 2,
    paginationResults: {
      currentPage: 1,
      limit: 50,
      numberOfPages: 1,
    },
    data: [
      {
        _id: "65ce5132e3e9a49a774ae1f6",
        title: "Cartoon Anime Naruto Printed Hoodie Orange/Black/Yellow",
        slug: "cartoon-anime-naruto-printed-hoodie-orangeblackyellow",
        description:
          "Cartoon Anime Naruto Printed Hoodie Orange/Black/Yellow Cartoon Anime Naruto Printed Hoodie Orange/Black/Yellow",
        imageCover:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-d59b51a9-92e6-4f18-9ce9-560f63d50759-1708020016909.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=a47ba2ba59c09cb9933ef4d68001cb2086bca7621071ef423902bda09d7a7f6e&X-Amz-SignedHeaders=host&x-id=GetObject",
        images: [
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-f7ef4772-caea-46e0-a013-21845a695832-1708020017697-3.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=3d0a09bca40e358ff2fbd7efa5db9f1844738d0c3b79fe206f1f8cd81626b18d&X-Amz-SignedHeaders=host&x-id=GetObject",
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-8fa8bee3-088c-4418-a02b-f46960c5cdd6-1708020017701-2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=be3111b399d00be404ae4359d5edc3756291bbdf73cc5d7ee00d41c1c0f4097b&X-Amz-SignedHeaders=host&x-id=GetObject",
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-556223c3-9afb-4041-aa27-291d3bd00f28-1708020017706-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=4ab6815ebf120d13f88a2bd37fc4024394cf8c57b9956059242258c5ef87518c&X-Amz-SignedHeaders=host&x-id=GetObject",
        ],
        sizes: [
          {
            size: "M",
            quantity: 500,
            price: 250,
            priceAfterDiscount: 200,
            _id: "65ce5132e3e9a49a774ae1f7",
          },
          {
            size: "L",
            quantity: 500,
            price: 300,
            priceAfterDiscount: 250,
            _id: "65ce5132e3e9a49a774ae1f8",
          },
          {
            size: "XL",
            quantity: 500,
            price: 300,
            priceAfterDiscount: 250,
            _id: "65ce5132e3e9a49a774ae1f9",
          },
        ],
        category: "6546743c9ad1fc81a9e8dd77",
        subCategories: ["6547d30cdc1172c2c78bee7b", "6547d2e7dc1172c2c78bee77"],
        underSubCategories: [],
        sold: 952,
        ratingsAverage: 4.7,
        ratingsQuantity: 1230,
        createdAt: "2024-02-15T18:00:18.726Z",
        updatedAt: "2024-02-15T18:00:18.726Z",
        id: "65ce5132e3e9a49a774ae1f6",
        save: false,
      },
      {
        _id: "65ce4e15e3e9a49a774ae1a9",
        title:
          "New 2023 Studio Pro Wireless Over-Ear Headphones With Noise Cancellation Navy",
        slug: "new-2023-studio-pro-wireless-over-ear-headphones-with-noise-cancellation-navy",
        description:
          "Beats Custom Acoustic Platform The Beats Studio Pro custom acoustic platform delivers an immersive listening experience. Each custom 40mm driver has been engineered for optimal clarity, with near-zero distortion even at high volume – an improvement of up to 80% compared to Beats Studio3, providing increased audio fidelity. An integrated digital processor optimizes the final frequency response for a powerful, yet balanced sound profile crafted to bring out the subtle details of whatever you’re listening to. Active Noise Cancelling and Transparency Mode At the touch of a button, two dynamic listening modes let you choose whether to keep the world out, or let it in. Fully adaptive Active Noise Cancelling (ANC) continuously monitors the noise around you in real-time, then creates a precisely-tuned filter to cancel it out. Easily switch to Transparency mode to let the sounds of your environment mix seamlessly with your music when you want to stay present and aware. Spatial Audio Get lost in theater-like sound from your favorite content with Spatial Audio¹. Music and movies available in Dolby Atmos deliver full immersion with 360-degree surround sound. Beats Studio Pro also features dynamic head tracking for an interactive experience that moves with you. You can even personalize Spatial Audio just for your ears using your iPhone. Enhanced Apple Compatibility Beats Studio Pro offers a host of native Apple features: One-touch pairing - easy, one-touch setup instantly pairs with every device in your iCloud account² “Hey Siri” - simply say “Hey Siri” to activate your voice assistant³ Find My - locate your lost headphones on a map based on the last known connected location⁴ Over-the-air updates - receive software updates and new features automatically Enhanced Android Compatibility Beats Studio Pro is equipped with an array of Android features: Google Fast Pair - connect quickly with a single tap, and automatically pair to all Android or Chrome devices registered to your Gmail account⁵ Audio Switch - seamlessly transition audio between your Android, Chromebook, and other compatible devices⁶ Find My Device - easily locate your lost headphones on a map with Google Find My Device⁷ Beats app for Android - unlock access to product customization, software updates, and new features to get the most out of your headphones Clear Calls Upgraded voice-targeting microphones in Beats Studio Pro give you high-quality call performance. These powerful microphones actively filter out background noise to enhance the clarity of your voice – up to 27% better than Beats Studio3. For Longer Listening With up to 40 hours of battery life⁸, Beats Studio Pro headphones keep you immersed in your music longer. With ANC or Transparency Mode enabled, enjoy up to 24 hours of listening time. When you’re low on power, Fast Fuel gives you up to 4 hours of play time from a quick, 10-minute charge⁹. Wireless and Wired Connectivity Beats Studio Pro offers multiple ways to connect with your devices: Class 1 Bluetooth for exceptional wireless connectivity, USB-C audio for simultaneous listening and charging¹⁰, and 3.5mm analog input for wired audio sources. And with the newly designed carrying case, you can easily store the cables with your headphones. Optimized Sound Profiles While using USB-C audio, you can select between three distinct sound profiles: the Beats Signature profile delivers the most tonally balanced tuning for all genres of music. The Entertainment profile boosts select portions of the audio spectrum, offering a heightened experience for movies and games. And the Conversation profile optimizes the frequency response for voice – ideal for phone calls or podcasts. Designed for Comfort This iconic design is lightweight and comfortable, so you can get lost in your music. The UltraPlush over-ear cushions have been upgraded with seamless engineered leather, delivering all-day comfort and exceptional durability. And the premium metal sliders offer a wide range",
        price: 1499,
        priceAfterDiscount: 1200,
        imageCover:
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-01f72d15-27c4-4624-a07c-679ab31d6330-1708019220750.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=dacbfb75c162f6de9aba40e2f841814a8b46f11864989432e5c31a0d4aa0f2fc&X-Amz-SignedHeaders=host&x-id=GetObject",
        images: [
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-10303cc8-b76e-4530-bb34-b76fe889b267-1708019469552-2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=c67fa9c2316a69dd856bc8a2f341618b686bb9167547077d2a158d4e15afe4de&X-Amz-SignedHeaders=host&x-id=GetObject",
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9d1d884c-8b06-443f-b668-dad2261ece98-1708019469559-1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=abc5efdf45ecddf82c2970a36c5ce1a3c6053abe67a3c8d2ca36492b03374bbb&X-Amz-SignedHeaders=host&x-id=GetObject",
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2fd2d8a1-cd79-41aa-937a-453ed3e16562-1708019469546-4.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=6ff29f156bb8186e2a16cf1842e7252dcd5e25fabe48ca82ce622dda7a6f674a&X-Amz-SignedHeaders=host&x-id=GetObject",
          "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-963a6a0b-160e-413d-bc18-2b5f4db74d96-1708019469556-3.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240215%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240215T180024Z&X-Amz-Expires=3600&X-Amz-Signature=7e4882ad18829e6c05d01e22a79f59f43b3fbe1db201d8fdf4b7a528f47d0c91&X-Amz-SignedHeaders=host&x-id=GetObject",
        ],
        quantity: 500,
        category: "6546743c9ad1fc81a9e8dd77",
        subCategories: ["6547d30cdc1172c2c78bee7b", "6547d2e7dc1172c2c78bee77"],
        underSubCategories: [],
        sold: 128,
        ratingsAverage: 3.9,
        ratingsQuantity: 125,
        sizes: [],
        createdAt: "2024-02-15T17:47:01.698Z",
        updatedAt: "2024-02-15T17:51:10.619Z",
        id: "65ce4e15e3e9a49a774ae1a9",
        save: false,
      },
    ],
  };
};
