import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import Animation from '../../Assets/lf30_editor_1wlkgjbl.json';


function DontSearch() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPaused(true)
    }, 4500);
  }, [])

    const options = {
        animationData: Animation,
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
      };

    const styles = {
        textAlign: 'center',
        fontSize: '1.7rem'
    }

  return (
    <div style={styles}>
        <Lottie 
            options={options}
            height={400}
            width={300}
            isPaused={paused}
        />
        <p>Termine suas edições para poder Pesquisar...</p>
    </div>
  )
}

export default DontSearch