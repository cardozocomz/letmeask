import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState} from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoLightImg from '../assets/images/logoLight.svg';
import logoDarkImg from '../assets/images/logoDark.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { ThemeButton } from '../components/ThemeButton';
import { useTheme } from '../hooks/useTheme';

export function NewRoom(){
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();
  const { theme } = useTheme();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,      
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />   
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <div className="pre-main">
        <div className="theme-container">
            <ThemeButton/>
        </div>        
        <main>
          <div className="after-main">
            <div className="main-content">
            { theme === 'light' ? (
                <img src={logoDarkImg} alt="Letmeask" />
              ) : (
                <img src={logoLightImg} alt="Letmeask" />
              ) }           
              <h2>Criar uma nova sala</h2>
              <form onSubmit={handleCreateRoom}>
                <input
                  type="text"
                  placeholder="Nome da sala"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                />
                <Button type="submit">
                  Criar sala
                </Button>
              </form>
              <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}