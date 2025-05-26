import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, ExternalLink, Volume2, VolumeX, Play } from 'lucide-react';

const projects = [
  {
    title: "Cerebro Sports",
    category: "Sports Tech",
    achievement: "Head of Product & AI",
    description: "Leading product development and AI innovation to drive better outcomes for basketball professionals and players through advanced analytics and insights.",
    url: "https://cerebrosports.com",
    icon: "logo",
    logoSrc: "/images/cerebro-logo.png",
    video: "/images/video1.mp4",
    poster: "https://via.placeholder.com/800x450/8e44ad/ffffff?text=Cerebro+Sports+Demo"
  },
  {
    title: "MIT Sloan",
    category: "Sports Analytics Conference",
    achievement: "MIT Sloan Sports Analytics Startup Contest Winner",
    description: "Won best startup at the most prestigious sports analytics conference in the world.",
    url: "https://www.linkedin.com/posts/cerebro-sports_breaking-newscerebro-sports-has-been-named-activity-7305926506176761856-D2Vh/",
    icon: "logo",
    logoSrc: "/images/ssac.png",
    video: "/images/sloan.mp4",
    poster: "https://via.placeholder.com/800x450/e74c3c/ffffff?text=MIT+Sloan+Presentation"
  },
  {
    title: "Amaan2Something",
    category: "Content Series",
    achievement: "Inspirational Video Series",
    description: "Content creation and inspirational videos challenging conventional corporate paths, promoting startup adventures, and sharing productivity hacks for success.",
    url: "https://www.instagram.com/amaan2something/",
    icon: "logo",
    logoSrc: "/images/a2s.png",
    video: "/images/a2s.mp4",
    poster: "https://via.placeholder.com/800x450/f39c12/ffffff?text=Amaan2Something+Content"
  },
  {
    title: "Hoops Dojo",
    category: "Basketball Analytics",
    achievement: "Content Creator making basketball videos",
    description: "My platform is focused on enjoying the playfulness of the game, from analyzing hypotheticals to breaking down advanced stats.",
    url: "https://www.youtube.com/@TheHoopsDojo",
    icon: "logo",
    logoSrc: "/images/Hoops-Dojo-Logo.png",
    video: "/images/2k.mp4",
    poster: "https://via.placeholder.com/800x450/27ae60/ffffff?text=Hoops+Dojo+Analytics"
  },
  {
    title: "Flowstate LA",
    category: "Lifestyle Brand",
    achievement: "Lifestyle brand centered around adventure",
    description: "A group of friends documenting our journeys in chasing adventure and capturing the flowstate one video, one story, at a time.",
    url: "https://www.instagram.com/flowstatela/",
    icon: "logo",
    logoSrc: "/images/fsla-logo.png",
    video: "/images/fsla.mp4",
    poster: "https://via.placeholder.com/800x450/00bcd4/ffffff?text=FlowState+LA"
  }
];

const Section = styled.section`
  min-height: 100vh;
  background: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 16px 60px 16px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-align: center;

  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #8e44ad 0%, #e74c3c 100%);
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: auto;
  min-height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselTrack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  position: absolute;
  background: linear-gradient(135deg, #18181b 80%, #2d0036 100%);
  border-radius: 2rem;
  border: 1.5px solid rgba(142, 68, 173, 0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  /* Position and scale based on offset */
  ${({ offset }) => {
    if (offset === 0) {
      return `
        width: 600px;
        min-height: 600px;
        height: auto;
        z-index: 10;
        transform: translateX(0) scale(1);
        opacity: 1;
        box-shadow: 0 15px 60px 0 rgba(80, 0, 80, 0.35), 0 3px 15px 0 rgba(0,0,0,0.25);
      `;
    } else if (Math.abs(offset) === 1) {
      return `
        width: 450px;
        min-height: 500px;
        height: auto;
        z-index: 5;
        transform: translateX(${offset * 400}px) scale(0.8);
        opacity: 0.6;
        box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.5);
      `;
    } else {
      return `
        width: 300px;
        min-height: 400px;
        height: auto;
        z-index: 1;
        transform: translateX(${offset * 600}px) scale(0.6);
        opacity: 0;
        pointer-events: none;
      `;
    }
  }}
  
  &:hover {
    ${({ offset }) => offset === 0 && `
      transform: translateX(0) scale(1.02);
      box-shadow: 0 20px 70px 0 rgba(80, 0, 80, 0.45), 0 4px 20px 0 rgba(0,0,0,0.35);
    `}
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  background: transparent;
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0,0,0,0.8);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.2);
  letter-spacing: 0.5px;
  z-index: 2;
`;

const SoundIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.9);
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  z-index: 3;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  &:hover {
    background: rgba(0,0,0,1);
    border-color: rgba(255,255,255,0.6);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 20px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.8);
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  
  &:hover {
    background: rgba(0,0,0,0.9);
    border-color: #fff;
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(0,0,0,0.6);
  }
  
  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.1);
  }
`;

const NavButtonLeft = styled(NavButton)`
  left: 30px;
`;

const NavButtonRight = styled(NavButton)`
  right: 30px;
`;

const Content = styled.div`
  padding: ${({ isCenter }) => isCenter ? '28px 28px 24px 28px' : '20px 20px 16px 20px'};
  display: flex;
  flex-direction: column;
  gap: ${({ isCenter }) => isCenter ? '16px' : '10px'};
  background: linear-gradient(135deg, #18181b 90%, #2d0036 100%);
  flex: 1;
  min-height: auto;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ isCenter }) => isCenter ? '16px' : '10px'};
`;

const ProjectIcon = styled.div`
  background: ${({ hasLogo }) => hasLogo ? 'transparent' : 'linear-gradient(135deg, #8e44ad 60%, #e74c3c 100%)'};
  border-radius: ${({ isCenter }) => isCenter ? '1rem' : '0.75rem'};
  padding: ${({ hasLogo, isCenter }) => hasLogo ? '0' : (isCenter ? '10px' : '8px')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isCenter }) => isCenter ? '48px' : '36px'};
  height: ${({ isCenter }) => isCenter ? '48px' : '36px'};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: ${({ isCenter }) => isCenter ? '1rem' : '0.75rem'};
  }
`;

const ProjectTitle = styled.h3`
  color: #fff;
  font-size: ${({ isCenter }) => isCenter ? '1.8rem' : '1.3rem'};
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
`;

const Achievement = styled.div`
  display: ${({ isCenter }) => isCenter ? 'inline-flex' : 'none'};
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, #8e44ad33, #e74c3c33);
  border-radius: 999px;
  padding: 8px 16px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid #8e44ad44;
`;

const Description = styled.p`
  color: #e0e0e0;
  font-size: ${({ isCenter }) => isCenter ? '1.1rem' : '0.9rem'};
  margin: 0;
  display: ${({ isCenter }) => isCenter ? 'block' : 'none'};
  line-height: 1.5;
  flex: 1;
`;

const Footer = styled.div`
  display: ${({ isCenter }) => isCenter ? 'flex' : 'none'};
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectIndex = styled.span`
  color: #b3b3b3;
  font-size: 0.95rem;
`;

const ViewButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, #8e44ad, #e74c3c);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 20px;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 3px 10px rgba(142, 68, 173, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(90deg, #9b59b6, #f39c12);
    box-shadow: 0 5px 20px rgba(142, 68, 173, 0.3);
    transform: translateY(-2px);
  }
`;

const FeaturedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mutedVideos, setMutedVideos] = useState(new Set()); // Videos start unmuted by default
  const [playingVideos, setPlayingVideos] = useState(new Set()); // No videos playing initially

  const nextProject = () => {
    const newIndex = (currentIndex + 1) % projects.length;
    setCurrentIndex(newIndex);
    // Pause all videos when navigating
    setPlayingVideos(new Set());
  };
  
  const prevProject = () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
    // Pause all videos when navigating
    setPlayingVideos(new Set());
  };

  const handleCardClick = (offset) => {
    if (offset !== 0) {
      const newIndex = (currentIndex + offset + projects.length) % projects.length;
      setCurrentIndex(newIndex);
      // Pause all videos when navigating
      setPlayingVideos(new Set());
    }
  };

  const handleVideoClick = (e, projectIndex) => {
    e.stopPropagation();
    
    const videoContainer = document.querySelector(`.video-container[data-index="${projectIndex}"]`);
    if (videoContainer) {
      const video = videoContainer.querySelector('video');
      if (video && typeof video.play === 'function' && typeof video.pause === 'function') {
        if (playingVideos.has(projectIndex)) {
          video.pause();
          setPlayingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(projectIndex);
            return newSet;
          });
        } else {
          video.play().catch(console.error);
          setPlayingVideos(prev => new Set(prev).add(projectIndex));
        }
      }
    }
  };

  const handleSoundToggle = (e, projectIndex) => {
    e.stopPropagation();
    const videoContainer = e.target.closest('.video-container');
    const video = videoContainer.querySelector('video');
    
    if (mutedVideos.has(projectIndex)) {
      video.muted = false;
      setMutedVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectIndex);
        return newSet;
      });
    } else {
      video.muted = true;
      setMutedVideos(prev => new Set(prev).add(projectIndex));
    }
  };

  useEffect(() => {
    const getVisibleProjects = () => {
      const visible = [];
      for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + projects.length) % projects.length;
        visible.push({ ...projects[index], offset: i, index });
      }
      return visible;
    };

    const visibleProjects = getVisibleProjects();
    visibleProjects.forEach((project) => {
      const videoContainer = document.querySelector(`.video-container[data-index="${project.index}"]`);
      if (videoContainer) {
        const video = videoContainer.querySelector('video');
        if (video) {
          video.muted = mutedVideos.has(project.index);
          if (playingVideos.has(project.index)) {
            video.play().catch(console.error);
          } else {
            video.pause();
          }
        }
      }
    });
  }, [currentIndex, mutedVideos, playingVideos]);

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + projects.length) % projects.length;
      visible.push({ ...projects[index], offset: i, index });
    }
    return visible;
  };

  return (
    <Section id="featured-projects">
      <SectionHeader>
        <SectionTitle>Featured Projects</SectionTitle>
      </SectionHeader>
      
      <CarouselContainer>
        <NavButtonLeft onClick={prevProject} aria-label="Previous project">
          <ChevronLeft size={26} />
        </NavButtonLeft>
        
        <CarouselTrack>
          {getVisibleProjects().map((project, idx) => {
            const isCenter = project.offset === 0;
            
            return (
              <Card
                key={`${project.index}-${idx}`}
                offset={project.offset}
                onClick={() => handleCardClick(project.offset)}
              >
                <VideoContainer className="video-container" data-index={project.index}>
                  <StyledVideo
                    src={project.video}
                    poster={project.poster}
                    preload="auto"
                    loop
                    muted={mutedVideos.has(project.index)}
                    playsInline
                    onClick={(e) => handleVideoClick(e, project.index)}
                    onLoadedMetadata={(e) => {
                      // Try to show a frame that's not black
                      const video = e.target;
                      setTimeout(() => {
                        if (video.duration > 1) {
                          video.currentTime = Math.min(1, video.duration * 0.1);
                        } else {
                          video.currentTime = 0.1;
                        }
                      }, 100);
                    }}
                    onError={(e) => {
                      console.log(`Video failed to load: ${project.video}`);
                    }}
                  />
                  <CategoryBadge>{project.category}</CategoryBadge>
                  <SoundIndicator onClick={(e) => handleSoundToggle(e, project.index)}>
                    {mutedVideos.has(project.index) ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </SoundIndicator>
                  {!playingVideos.has(project.index) && (
                    <PlayButton onClick={(e) => handleVideoClick(e, project.index)}>
                      <Play size={32} />
                    </PlayButton>
                  )}
                </VideoContainer>
                <Content isCenter={isCenter}>
                  <ProjectHeader isCenter={isCenter}>
                    <ProjectIcon isCenter={isCenter} hasLogo={project.icon === "logo"}>
                      {project.icon === "logo" ? (
                        <img 
                          src={project.logoSrc} 
                          alt={project.title}
                          onError={(e) => {
                            console.error(`Failed to load logo for ${project.title}:`, project.logoSrc);
                            e.target.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log(`Successfully loaded logo for ${project.title}:`, project.logoSrc);
                          }}
                        />
                      ) : (
                        React.createElement(project.icon, { size: isCenter ? 26 : 20, color: "#fff" })
                      )}
                    </ProjectIcon>
                    <ProjectTitle isCenter={isCenter}>{project.title}</ProjectTitle>
                  </ProjectHeader>
                  <Achievement isCenter={isCenter}>
                    <span>●</span> {project.achievement}
                  </Achievement>
                  <Description isCenter={isCenter}>{project.description}</Description>
                  <Footer isCenter={isCenter}>
                    <ProjectIndex>
                      Project {currentIndex + 1} of {projects.length}
                    </ProjectIndex>
                    <ViewButton href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} /> View Project
                    </ViewButton>
                  </Footer>
                </Content>
              </Card>
            );
          })}
        </CarouselTrack>
        
        <NavButtonRight onClick={nextProject} aria-label="Next project">
          <ChevronRight size={26} />
        </NavButtonRight>
      </CarouselContainer>
    </Section>
  );
};

export default FeaturedProjects;