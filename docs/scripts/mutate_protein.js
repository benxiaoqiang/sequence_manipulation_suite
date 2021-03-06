//    Sequence Manipulation Suite. A collection of simple JavaScript programs
//    for generating, formatting, and analyzing short DNA and protein
//    sequences.
//    Copyright (C) 2020 Paul Stothard stothard@ualberta.ca
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <https://www.gnu.org/licenses/>.
//

//Written by Paul Stothard, University of Alberta, Canada

function mutateProtein(theDocument) {
  var newProtein = "";
  var title = "";
  var maxInput = 1000000000;
  var maxDigitsInput = 100000000;

  if (testScript() == false) {
    return false;
  }

  var enteredNumber = theDocument.forms[0].elements[4].value.replace(
    /[^\d]/g,
    ""
  );

  if (
    checkFormElement(theDocument.forms[0].elements[0]) == false ||
    checkSequenceLength(theDocument.forms[0].elements[0].value, maxInput) ==
      false ||
    verifyMaxDigits(enteredNumber, maxDigitsInput) == false
  ) {
    return false;
  }

  openWindow("Mutate Protein");
  openPre();
  var arrayOfFasta = getArrayOfFasta(theDocument.forms[0].elements[0].value);

  for (var i = 0; i < arrayOfFasta.length; i++) {
    newProtein = getSequenceFromFasta(arrayOfFasta[i]);
    title = getTitleFromFasta(arrayOfFasta[i]);

    newProtein = removeNonProteinAllowDegen(newProtein);

    outputWindow.document.write(
      getFastaTitleFromTitleAndSequence(title, newProtein)
    );
    writeMutatedSequence(
      newProtein,
      [
        "A",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "V",
        "W",
        "Y",
      ],
      enteredNumber,
      theDocument.forms[0].elements[5].options[
        theDocument.forms[0].elements[5].selectedIndex
      ].value,
      newProtein.length - 1
    );

    outputWindow.document.write("\n\n");
  }

  closePre();
  closeWindow();
  return true;
}
