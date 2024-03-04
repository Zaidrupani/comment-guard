import React from 'react';
import { Card } from '@material-ui/core';
import '../Styles/Resources.css';

const Resources = () => {
  const cardData = [
    { imageUrl: 'https://www.helpguide.org/wp-content/uploads/2023/02/Bullying-1536x1024.jpeg', title: 'Deal with a Bully and Overcome Bullying', link: 'https://www.helpguide.org/articles/abuse/bullying.htm' },
    { imageUrl: 'https://leher.org/wp-content/uploads/2017/10/Befriending-The-Big-Bad-Bully-The-bully-mural-project-1-1.png', title: '#NOBULLIESALLOWED', link: 'https://leher.org/campaigns/nobulliesallowed/' },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6CJHuSp2iYknqFvcfGYSZOM-hpup5xCMcA&usqp=CAU', title: "What to Do If You're a Victim", link: 'https://www.endcyberbullying.net/what-to-do-if-youre-a-victim' },
    { imageUrl: 'https://kidshelpline.com.au/sites/default/files/bdl_image/OGAIBB_TEEN_THUMBNAIL_0_0.png', title: 'Cyberbullying', link: 'https://kidshelpline.com.au/teens/issues/cyberbullying' },
    { imageUrl: 'https://www.cybersmile.org/wp-content/uploads/Crisis-support-hotline-numbers.jpg', title: 'Who to Call?', link: 'https://www.cybersmile.org/advice-help/category/who-to-call' },
    { imageUrl: 'https://images.squarespace-cdn.com/content/v1/5b80922970e8026e68b07e88/b489d310-de89-44a8-a465-acf937e5f98c/social-media.jpg', title: 'What Is a Social Media Threat?', link: 'https://www.proofpoint.com/us/threat-reference/social-media-threats' },
  ];

  return (
    <div style={{height : '900px'}}>
      <p className='titleresources'> Resources</p>
      <div className='resourcesline' style={{ position: 'absolute', top: '180px' }}></div>

      <div className="custlaycont">
        <div className="custcardsec">
          {cardData.map((card, index) => (
            <a key={index} href={card.link} target="_blank" rel="noopener noreferrer" className="custcardwrap">
              <Card className="custcard">
                <img src={card.imageUrl} alt={`Card ${index + 1}`} className="card-image" />
                <div className="hover-text">Click here to read</div>
              </Card>
              <div className="card-title">{card.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
