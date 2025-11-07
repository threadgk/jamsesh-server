const express = require("express"); 
const cors = require("cors");
const app = express(); 
app.use(express.static("public")); 
app.use(cors()); 

app.get("/", (req, res) => { 
    res.sendFile(__dirname + "/index.html");  
}); 

app.get("/api/artists", (req, res) => { 
    const artists = [
    {
        "_id": "001", 
        "_name": "Kendrick Lamar", 
        "_dob": "Jun 17, 1987", 
        "_genre": "Hip-Hop/Rap",
        "_debut-year": "2011",
        "_debut-album": "Section.80" ,
        "img": "/images/artist/kendrick.png", 
        "_description": "Kendrick Lamar is a rapper from Compton, California, born on June 17, 1987. He is seen as one of the most important voices in hip-hop today. His music blends personal stories with bigger issues like race, culture, and society. He became widely known with his album good kid, m.A.A.d city in 2012. Kendrick is known for being real, thoughtful, and creative with his lyrics. Over the years, he has won many Grammy Awards for his music. In 2018, he even won a Pulitzer Prize for his album DAMN., which is very rare for a rapper. Fans admire him because he uses music to inspire people and make them think. Kendrick Lamar is more than just a rapper—he’s a storyteller and an artist with a strong message."
    } ,

    {
        "_id": "002", 
        "_name": "Drake", 
        "_dob": "Oct 24, 1986", 
        "_genre": "Hip-Hop/Rap/R&B",
        "_debut-year": "2010",
        "_debut-album": "Thank Me Later" ,
        "img": "/images/artist/drake.png", 
        "_description": "Drake is a rapper, singer, and songwriter from Toronto, Canada. He was born on October 24, 1986. Before music, he first got noticed as an actor on the TV show Degrassi: The Next Generation. He later switched to music and became one of the biggest names in hip-hop and pop. His early mixtapes and debut album Thank Me Later helped launch his career. Drake is known for blending rap with R&B and making songs that are both catchy and emotional. He has won many Grammy Awards and broken multiple music records, including the most streamed artist on platforms like Spotify. People connect with him because he makes music about love, success, heartbreak, and life’s ups and downs. He also built his own label, OVO Sound, and has become a major influence in the music industry. Drake is more than a rapper—he’s a global star who shaped modern hip-hop and pop culture."
    } ,

    {
        "_id": "003", 
        "_name": "Dominic Fike", 
        "_dob": "Dec 30, 1995", 
        "_genre": "Alt/Hip-Hop/Rap",
        "_debut-year": "2018",
        "_debut-album": "What Could Possibly Go Wrong" ,
        "img": "/images/artist/dominic.png", 
        "_description": "Dominic Fike is a singer, songwriter, and rapper from Naples, Florida, born on December 30, 1995. He first started sharing music online and quickly gained attention. In 2018, he released an EP called Don't Forget About Me, Demos, which made him stand out in the industry. His style mixes rap, rock, and pop, giving his music a unique sound. One of his breakout songs was “3 Nights,” which became very popular worldwide. In 2020, he released his first full album What Could Possibly Go Wrong. He also reached an even bigger audience when he acted in the TV show Euphoria in 2022. Fans enjoy his honest lyrics and the laid-back vibe in his music. Dominic Fike is known for blending genres and creating his own style in today’s music scene."
    } ,

    {
        "_id": "004", 
        "_name": "Malcom Todd", 
        "_dob": "Sep 15, 2003", 
        "_genre": "Alt/R&B",
        "_debut-year": "2021",
        "_debut-album": "Sweet Boy" ,
        "img": "/images/artist/malcolm-todd.png", 
        "_description": "Malcolm Todd is a rising R&B and pop artist known for his smooth voice and heartfelt songwriting. He started gaining attention through streaming platforms and social media, where his unique sound caught on with younger audiences. His music blends elements of soul, pop, and alternative R&B, giving him a fresh style that feels modern but emotional. Fans appreciate the vulnerability in his lyrics and the way he experiments with sounds. Malcolm Todd is still early in his career, but he is quickly becoming recognized as one of the new voices to watch in the music scene."
    } ,

    {
        "_id": "005", 
        "_name": "Kevin Abstract", 
        "_dob": "Jul 16, 1996", 
        "_genre": "Alt/Hip-Hop/R&B",
        "_debut-year": "2014",
        "_debut-album": "American Boyfriend: A Suburban Love Story" ,
        "img": "/images/artist/kevin.png", 
        "_description": "Kevin Abstract is a rapper, singer, and songwriter from Corpus Christi, Texas, born on July 16, 1996. He is best known as a founding member of the hip-hop collective Brockhampton, often called a “boy band” for their creative mix of rap, pop, and alternative styles. His solo work, like the albums American Boyfriend and Arizona Baby, explores themes of love, identity, and growing up. Kevin is known for being open and personal in his lyrics, often sharing his experiences as a queer artist in hip-hop. Fans connect with his honesty and creativity, and he’s seen as someone who pushes boundaries in both music and storytelling."
    } ,

    {
        "_id": "006", 
        "_name": "Clairo", 
        "_dob": "2017", 
        "_genre": "Alt/Lyrical",
        "_debut-year": "June, 2003",
        "_debut-album": "Immunity" ,
        "img": "/images/artist/clairo.png", 
        "_description": "Clairo is an indie pop singer and songwriter from Massachusetts, born on August 18, 1998. She first gained attention in 2017 when her song “Pretty Girl” went viral on YouTube. Her music is known for its soft, dreamy sound, often mixing bedroom pop with indie rock and electronic influences. In 2019, she released her debut album Immunity, which received critical praise for its songwriting and production. Clairo’s lyrics often touch on themes like love, identity, and self-discovery. Fans appreciate her authenticity and relatability, which make her music feel intimate and personal."
    } ,

    {
        "_id": "007", 
        "_name": "Gracie Abrams", 
        "_dob": "Sep 07, 1999", 
        "_genre": "Alt/Lyrical/Pop",
        "_debut-year": "2019",
        "_debut-album": "Minor EP" ,
        "img": "/images/artist/gracie.png", 
        "_description": "Gracie Abrams is a singer-songwriter from Los Angeles, born on September 7, 1999. She is known for her emotional, soft-spoken voice and heartfelt lyrics. Her music often focuses on themes of heartbreak, relationships, and growing up. She started releasing songs online before signing to a major label and quickly gained a dedicated following. In 2021, she released her debut project This Is What It Feels Like, followed by her album Good Riddance in 2023. Fans connect with her because her music feels raw, honest, and personal."
    } ,

    {
        "_id": "008", 
        "_name": "Hailee Steinfeld", 
        "_dob": "Dec 11, 1996", 
        "_genre": "Pop",
        "_debut-year": "2015",
        "_debut-album": "Haiz EP" ,
        "img": "/images/artist/hailee.png", 
        "_description": "Hailee Steinfeld is a singer and actress from Los Angeles, born on December 11, 1996. She first became known as an actress, earning an Academy Award nomination for her role in True Grit at just 14 years old. She later launched her music career, blending pop and R&B influences. Some of her best-known songs include “Love Myself” and “Starving.” Hailee’s music is upbeat and empowering, often focusing on themes of independence and self-confidence. Along with her music, she continues to act in movies and shows, making her a multi-talented star."
    } ,

    {
        "_id": "009", 
        "_name": "Lizzy McAlpine", 
        "_dob": "Sep 21, 1999", 
        "_genre": "Alt/Lyrical",
        "_debut-year": "2020",
        "_debut-album": "Give Me A Minute" ,
        "img": "/images/artist/lizzy.png", 
        "_description": "Lizzy McAlpine is a singer-songwriter from Philadelphia, born on September 21, 1999. She is known for her emotional, folk-inspired style and her storytelling through music. She first gained attention on social media with her heartfelt acoustic songs before releasing her debut album Give Me A Minute in 2020. In 2022, her song “Ceilings” went viral and introduced her to an even bigger audience. Lizzy’s lyrics often focus on love, loss, and self-reflection. Fans love her honesty, vulnerability, and the calming quality of her voice."
    } ,

    {
        "_id": "010", 
        "_name": "Frank Ocean", 
        "_dob": "Oct 28, 1987", 
        "_genre": "Alt/Hip-Hop/R&B",
        "_debut-year": "2011",
        "_debut-album": "Nostalgia, Ultra" ,
        "img": "/images/artist/frank.png", 
        "_description": "Frank Ocean is a singer, songwriter, and producer from Long Beach, California, born on October 28, 1987. He is one of the most influential artists of modern R&B and alternative music. Frank first gained attention as a member of the collective Odd Future before releasing his own projects like Channel Orange in 2012 and Blonde in 2016. His music is known for its experimental sound and deeply personal lyrics about love, identity, and self-discovery. Frank is admired for pushing creative boundaries and inspiring a generation of artists. Fans respect him not only for his music but also for staying true to his vision."
    } ,

    {
        "_id": "011", 
        "_name": "Childish Gambino", 
        "_dob": "Sep 25, 1983", 
        "_genre": "Alt/Hip-Hop/R&B",
        "_debut-year": "2011",
        "_debut-album": "Camp" ,
        "img": "/images/artist/childish-gambino.png", 
        "_description": "Childish Gambino is the stage name of Donald Glover, an actor, writer, comedian, and musician born on September 25, 1983. He first became known for his work on TV shows like Community and Atlanta, but he is also an award-winning musician. His music blends rap, funk, R&B, and soul, creating a unique style. His 2016 album “Awaken, My Love!” featured the hit “Redbone,” and in 2018, his song “This Is America” won multiple Grammy Awards. Childish Gambino is known for being versatile, creative, and socially aware in his music."
    } ,

    {
        "_id": "012", 
        "_name": "SZA", 
        "_dob": "Nov 08, 1989", 
        "_genre": "Alt/Hip-Hop/R&B",
        "_debut-year": "2012",
        "_debut-album": "See.SZA.Run EP" ,
        "img": "/images/artist/sza.png", 
        "_description": "SZA is a singer and songwriter from St. Louis, born on November 8, 1989. She is one of the most popular voices in modern R&B. Her debut album Ctrl in 2017 gained critical and commercial success with songs like “Love Galore” and “The Weekend.” She continued her success with her 2022 album SOS, which featured hits like “Kill Bill.” SZA’s music often explores themes of love, heartbreak, confidence, and self-discovery. Fans connect with her because of her emotional lyrics and smooth, soulful sound."
    } ,

    {
        "_id": "013", 
        "_name": "Audrey Hobert", 
        "_dob": "Feb 19, 1999", 
        "_genre": "Alt/Lyrical/Pop",
        "_debut-year": "2023",
        "_debut-album": "Who's The Clown?" ,
        "img": "/images/artist/audrey.png", 
        "_description": "Audrey Hobert is an up-and-coming artist who is gaining attention for her unique style and emotional songwriting. Her music often blends indie and alternative sounds, making her stand out as a fresh new voice. Fans appreciate the honesty and relatability in her lyrics, which often focus on personal growth, relationships, and navigating young adulthood. Though still early in her career, Audrey is quickly building a dedicated following and is seen as an artist with strong potential."
    } ,

    {
        "_id": "014", 
        "_name": "J Cole", 
        "_dob": "Jan 28, 1985", 
        "_genre": "Hip-Hop/Rap",
        "_debut-year": "2011",
        "_debut-album": "Cole World: The Sideline Story" ,
        "img": "/images/artist/jcole.png", 
        "_description": "J. Cole is a rapper, singer, and producer from Fayetteville, North Carolina, born on January 28, 1985. He is known for his thoughtful lyrics and storytelling about life, struggle, and success. His big break came when he was signed to Jay-Z’s label Roc Nation, leading to his debut album Cole World: The Sideline Story in 2011. J. Cole is admired for producing much of his own music and for his honesty in addressing real-life topics. Fans connect with him because his music feels authentic and down-to-earth. Over the years, he has become one of the most respected figures in modern hip-hop."
    }
];
    res.send(artists);
}); 
app.listen(3000, () => { 
    console.log("Server is running on port 3000"); 
});
