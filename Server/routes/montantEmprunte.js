const express = require("express");
const router = require("express").Router();



const calculateMortage = (montantDachat, fondPropre, duree) => {
  let empNet;

  const calFraitAchat = (number) => {
    return (number * 10) / 100;
  };
  const calFraitHypo = (number) => {
    return (number * 2) / 100;
  };
  const YearsToMonths = (number) => {
    return number * 12;
  };
  const calculeTauxAnn = (number) => {
    return number / 100;
  };
  const calculeTauxmons = (number) => {
    let num = Math.pow(1 + number / 100, 1 / 12) - 1;
    return Number((num * 100).toFixed(3));
  };
  const calcInt = (a, b) => {
    let res = (a * (b / 100)) / 100;
    return Number(res.toFixed(2));
  };
  const calcMonsualite = (a, b, c) => {
    let coff = b / 100;
    let x = Math.pow(1 + coff, c);
    let res = (a * coff * x) / (x - 1);
    return Number((res / 100).toFixed(2));
  };
  const calculCapital = (a, b) => {
    return Number((a - b).toFixed(2));
  };
  const calculeSoldFin = (a, b) => {
    return a - b * 100;
  };
  let month = YearsToMonths(duree);
  let tauxAnn = calculeTauxAnn(month);

  let fraitAchat = calFraitAchat(montantDachat);
  let tauxMons = calculeTauxmons(tauxAnn);
  if (montantDachat > 50000) {
    let empBrut = montantDachat + fraitAchat - fondPropre;
    empNet = empBrut + calFraitHypo(empBrut);
  } else {
    let empBrut = montantDachat - fondPropre;
    empNet = empBrut + calFraitHypo(empBrut);
  }
  let monsualite = calcMonsualite(empNet, tauxMons, month);
  let interet = calcInt(empNet, tauxMons);
  let capitale = calculCapital(monsualite, interet);
  let soldFin = calculeSoldFin(empNet, capitale);
  let soldDeb=[]
  let int=[]
  let capitRemb=[]
  let soldFinn =[]
  let oldBalance = empNet;
  for (var i = 1; i < month; i++) {
    let newInteret = calcInt(oldBalance, tauxMons);
    let newCapital = calculCapital(monsualite, newInteret);
    let newBalance = calculeSoldFin(oldBalance, newCapital);

    oldBalance = newBalance;
    soldDeb.push(oldBalance)
    int.push(newInteret)
    capitRemb.push(newCapital)
    soldFinn.push(newBalance)

  }

   return {empNet,monsualite,tauxAnn,capitale,soldDeb,int,capitRemb,soldFinn}
};
router.post("/", async (req, res) => {
  let montantDachat = req.body.montantDachat;
  let fondPropre = req.body.fondPropre;
  let dureeDuCr = req.body.dureeDuCr;
  let data = calculateMortage(montantDachat,fondPropre,dureeDuCr)
  
res.send(JSON.stringify(data))
console.log(data)
 
});
module.exports = router;
