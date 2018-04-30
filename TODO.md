# TODO

## Refactoring

* Chord type -> Chord quality
* Scale degree selector (numbers from 1-7) should get the maximum number from `scale.notes.length`.

## Bugs

* Dropped D crashes for low string position. The scale postion is currently aligned only based on the lowest string. On low dropped D positions, the notes on higher strings will be on lower frets than the notes on the lowest string. 
