Feature: Minesweeper  As a player:
            - I want to play to the classic minesweeper game
            - So I want to detect all the mines in the board  How to refer to a cell:
            - Using the (row,column) nomenclature
            - Rows and columns starts from 1  How to load mock data:
            - Using the <ctrl>+m keyboard combination to discover
            the load mock data form  To define the board data will use:
            "o" No mine
            "*" Mine
            "-" Row separator    Thera are two ways to define mock data:
            - Inline:
            "***-ooo-*oo"
            - Table:
            | * | * | * |
            | o | o | o |
            | * | o | o |
    COVERED CELLS
    "." Hidden cell
    "!" Cell tagged has mined cell by the user
    "?" Cell tagged has inconclusive cell by the user
    "x" Cell wrongly tagged has no mined cell by the user
    UNCOVERED CELLS
    "0" Empty cell
    "1" Clean cell with 1 adjacent mine
    "2" Clean cell with 2 adjacent mines
    "3" Clean cell with 3 adjacent mines
    "4" Clean cell with 4 adjacent mines
    "5" Clean cell with 5 adjacent mines
    "6" Clean cell with 6 adjacent mines
    "7" Clean cell with 7 adjacent mines
    "8" Clean cell with 8 adjacent mines
    "@" highlighted mine  Game example: http://birrell.org/andrew/minesweeper/


    ## INITIAL STATE
    Background:
        Given the player opens the game

    Scenario: Starting game - All the cells should be hidden
        Then all the cells should be covered
  
    Scenario: Starting game - All the cells should be untagged
        Then all the cells should be untagged

    Scenario: Starting game - All the cells should be enabled
        Then all the cells should be enabled

    Scenario: Starting game - Displaying mine count
        Given the player loads the following mock data: "<data>"
        Then the mine count display should show "<mineNumber>"

        Examples:
            | data        | mineNumber |
            | o*o-*oo-ooo | 2          |
            | ***-ooo-ooo | 3          |
            | *oo-o*o-**o | 4          |

    Scenario: Flagging a cell - From an untagged cell

        Given the player loads the following mock data:
            """
            | * | o |
            """
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be flagged


