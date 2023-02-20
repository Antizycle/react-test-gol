export default function Header({onClick}) {
  return (
      <div className='content__header'>
          <div className="header__help-btn" id="header__help-btn"
               data-title="About this page" onClick={onClick}>
               !
          </div>
          <p>This is The Game of Life!</p>
      </div>
  );
}