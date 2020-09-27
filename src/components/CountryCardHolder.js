import React from 'react';
import './CountryCardHolder.css';
import CounrtyCard from './CountryCard.js';

function countryCardHolder({dataRecieved,sorted,countryRank}) {

    return(
        <div className = "countryCardHolder">
            {   
                dataRecieved.map((eachDictonary, i) =>{

                    return(

                        <CounrtyCard
                        key = {i}
                        countryName = {eachDictonary["Country"]}
                        link = {`https://www.countryflags.io/${eachDictonary["CountryCode"]}/flat/64.png`}
                        casesToday = {eachDictonary["NewConfirmed"]}
                        totalCase = {eachDictonary["TotalConfirmed"]}
                        TotalDeaths = {eachDictonary["TotalDeaths"]}
                        date = {eachDictonary["Date"].substr(0,10)}
                        sorted = {sorted}
                        //rank = {i+1}
                        rank = {countryRank[eachDictonary["Country"]]}
                        
                        >
                        </CounrtyCard>
                    );
                })
                
            }
            
    
        </div>
    );

}

export default countryCardHolder;