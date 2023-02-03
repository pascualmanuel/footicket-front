import React from "react";
import "./Masonary.css";
import {Link} from "react-router-dom";
function Masonary() {
  return (
    <>
      <div class="masonry">
        <Link to={`/league/england`}>
          <div class="brick">
            <img
              src={
                "https://circulocentral.es/wp-content/uploads/2020/09/Premier-league.jpg"
              }
              alt="Premier League"
              title="Premier League"
            />
          </div>
        </Link>
        <Link to={`/league/spain`}></Link>
        <div class="brick">
          <img
            src={
              "https://www.tecnogus.com.co/wp-content/uploads/2021/09/La-Liga-Socioscom.jpg"
            }
            alt="LaLiga"
            title="LaLiga"
          />
        </div>
        <Link to={`/league/france`}>
          <div class="brick">
            <img
              src={
                "https://elcomodorense.net/wp-content/uploads/2021/08/tridente.jpg"
              }
              alt="Ligue 1"
              title="Ligue 1"
            />
          </div>
        </Link>
        <Link to={`/league/champions-league`}>
          <div class="brick">
            <img
              src={
                "https://imgresizer.eurosport.com/unsafe/1200x1200/smart/filters:format(jpeg)/origin-imgresizer.eurosport.com/2019/12/16/2737593-56573870-2560-1440.jpg"
              }
              alt="UCL"
              title="UCL"
            />
          </div>
        </Link>
        <Link to={`/league/italy`}>
          <div class="brick">
            <img
              src={
                "https://cdn.netnews.com.mt/wp-content/uploads/2021/11/19230559/serie-a.jpg"
              }
              alt="Serie A"
              title="Serie A"
            />
          </div>
        </Link>
        <Link to={`/league/italy`}>
          <div class="brick">
            <img
              src={
                "https://cdn.netnews.com.mt/wp-content/uploads/2021/11/19230559/serie-a.jpg"
              }
              alt="Serie A"
              title="Serie A"
            />
          </div>
        </Link>
        <Link to={`/league/italy`}>
          <div class="brick">
            <img
              src={
                "https://cdn.netnews.com.mt/wp-content/uploads/2021/11/19230559/serie-a.jpg"
              }
              alt="Serie A"
              title="Serie A"
            />
          </div>
        </Link>
        <Link to={`/league/germany`}>
          <div class="brick">
            <img
              src={
                "https://img.bundesliga.com/tachyon/sites/2/2019/02/Spielball-Derbystar-1200x675.jpg?crop=0px,0px,1200px,675px&fit=1140"
              }
              alt="germany"
              title="germany"
            />
          </div>
        </Link>
        <Link to={`/league/germany`}>
          <div class="brick">
            <img
              src={
                "https://img.bundesliga.com/tachyon/sites/2/2019/02/Spielball-Derbystar-1200x675.jpg?crop=0px,0px,1200px,675px&fit=1140"
              }
              alt="germany"
              title="germany"
            />
          </div>
        </Link>
        <Link to={`/league/germany`}>
          <div class="brick">
            <img
              src={
                "https://img.bundesliga.com/tachyon/sites/2/2019/02/Spielball-Derbystar-1200x675.jpg?crop=0px,0px,1200px,675px&fit=1140"
              }
              alt="germany"
              title="germany"
            />
          </div>
        </Link>
        <Link to={`/league/germany`}>
          <div class="brick">
            <img
              src={
                "https://i.pinimg.com/originals/1b/10/d4/1b10d49c6ccc3d1eb0c890d11ca83dd4.jpg"
              }
              alt="EuropaLeague"
              title="EuropaLeague"
            />
          </div>
        </Link>
      </div>
    </>
  );
}
export default Masonary;
