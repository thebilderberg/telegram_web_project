import { useTelegram } from './hooks/useTelegram';
import BurgerMenu from './project/BurgerMenu/BurgerMenu';
import Home from './project/Home/Home';
import './App.css';


function App() {
  // инициализация Telegram WebApp
  const tg = useTelegram();

  return (
    <div className="App">
      <BurgerMenu />
      <Home />

      {/* пример использования данных из Telegram */}
      {tg?.initDataUnsafe?.user && (
        <div className="user-info">
          👋 Привет, {tg.initDataUnsafe.user.first_name}!
        </div>
      )}
    </div>
  );
}

export default App;
