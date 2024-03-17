const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: "Ajith Kumar, popularly known as 'Thala Ajith,' is a celebrated Indian film actor who has left an indelible mark on the Tamil film industry. Born on May 1, 1971, in Hyderabad, India, Ajith's acting style is characterized by a unique blend of intensity, versatility, and natural flair. His ability to immerse himself into diverse roles has earned him accolades and Ajith's filmography is an impressive tapestry of successful movies, each contributing to his iconic status. Films like 'Mankatha,' 'Veeram,' 'Vedalam,' and 'Viswasam' have not only showcased his acting prowess but have also established him as a leading star in the industry. Apart from his cinematic achievements, Ajith is known for his philanthropic efforts, and his role as a family man. Ajith Kumar stands as a multifaceted personality, a revered actor, a racing enthusiast, a humble individual, and a beacon of inspiration. Ajith's humility and simplicity are often spoken about by those who have worked with him. Despite his celebrity status, he maintains a down-to-earth demeanor, making him approachable. Ajith's journey to stardom is a tale of perseverance, talent, and charisma. Beyond acting, Ajith is passionate about motorsports, expressing his love for speed and adventure. Ajith's dedication to motorsports has garnered him recognition and awards, further adding to his diverse repertoire. In addition to his contributions to the entertainment industry, Ajith is actively involved in philanthropic endeavors. His charitable activities span a range of causes, including education and healthcare. From a young age, Ajith displayed a penchant for acting and the arts. His foray into the film industry began in the late 1980s when he took on small roles. However, it was his breakthrough role in the film 'Prema Pusthakam' in 1992 that catapulted him into the spotlight. The success of the movie marked the beginning of Ajith's illustrious career in the world of cinema.",
      },
      {
        role: "model",
        parts: "You are a humble helper who can answer for questions asked by users from the given context.",
        
      },
      
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "Who is thala?";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
