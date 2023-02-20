export default function HelpBtn({hlpTgl, onClick}) {
  return (
      <>
          <div id="help" style={{visibility: hlpTgl ? 'visible' : 'hidden'}}>
              <span id="help__close-btn"
                    className="header__help-btn"
                    onClick={onClick}>
                  X
              </span>
              <p className="help__text">
                  This is an implementation of&nbsp;The&nbsp;Game&nbsp;of&nbsp;Life 
                  originaly devised by the British mathematician John Horton Conway
                  in 1970. It&nbsp;is&nbsp;a cellular automaton game which follows 
                  simple rules of cell evolution:
              </p>
              <ol>
                  <li>Any live cell with two or three live neighbours survives.</li>
                  <li>Any dead cell with three live neighbours becomes a live cell.</li>
                  <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
              </ol>
              <p className="help__text">You can set up gaming field by entering size values 
              (10-99 for both dimensions), intial alive perecentage (0-15%, 0 would generate 
              blank field) and evolution speed in miliseconds (40-2000).<br />
              <b>Generate</b> button generates playing field with chosen values.<br />
              <b>1 Cycle</b> would perform one evolution cycle.<br />
              <b>Start Evo</b> - start evolution process with selected speed until 
              <b>Stop Evo</b> button is pressed.<br />
              <b>Clear</b> button stop evolution (if it is running) and clears field 
              by generating new one with same properties.<br />
              Also you can manualy toggle cells at any moment.
              </p>
          </div>
          <div id="help__close" 
               style={{visibility: hlpTgl ? 'visible' : 'hidden'}} 
               onClick={onClick}>
          </div>
      </>
  );
}