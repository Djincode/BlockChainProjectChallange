// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {

    uint256   favoriteNumber;  // qabaginda public yazanda bu gorunen olur,hamiya aciq yeni

    mapping(string => uint256) public nameToFavoriteNumber; // stringden reqeme cevirir,mapping

    People public  person = People({favoriteNumber:2, name: "Perviz"});
    //People structunu isleden bir person deyiseni yaratdiq, ve ona baslangic(default) deyerler verdik

   function store(uint256 _favoriteNumber) public {
       favoriteNumber = _favoriteNumber;

       // favorite numbere yeni deyer vere bilirik bu bu funksiya ile
   }

   function retrieve() public  view  returns(uint256) {
    return favoriteNumber;
   } // view ve pure olanda o sadece izleyir,gas fee xerclemir

   struct People {
    uint256 favoriteNumber;
    string name;
   } //Burada struct yaratdiq, Yuxarida istifade etdik

   People[] public  people; // qabaqdaki mortezeler array oldugunu bildirir,

   function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber,_name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
   }
} 
