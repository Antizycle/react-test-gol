export default function Dashboard({dashCounters}) {
  const {gens, deaths, survs, births} = dashCounters;
  return (
      <ul className="nav__list" key='dashboard'>
              <li className="nav__item" key='dash-gen'>
                  Generation #: <span id="gen-counter"><b>{gens}</b> |</span>
              </li>
              <li className="nav__item" key='dash-death'>
                  Deaths: <span id="death-counter"><b>{deaths}</b> |</span>
              </li>
              <li className="nav__item" key='dash-surv'>
                  Survived: <span id="surv-counter"><b>{survs}</b> |</span>
              </li>
              <li className="nav__item" key='dash-birth'>
                  Ressurected: <span id="birth-counter"><b>{births}</b></span>
              </li>
          </ul>
  );
}