import random
from reset import *

current_songs = []
letters_opened = []
points = []
alphabet_letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z']

numbers = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9']


def main():
    global songs
    global current_songs
    global letters_opened
    global points

    print('-' * 30, 'Get the Letter!', '-' * 30)
    input('Press Enter to start the game!')

    song_num = int(input('Enter the number of songs：'))
    player_num = int(input('Enter the number of players：'))

    for i in range(player_num):
        points.append(0)

    while True:
        songs = random.choices(song_list, weights=song_difficulty, k=song_num)
        sorted_songs = sorted(songs)
        flag = True
        for i in range(len(sorted_songs) - 1):
            if sorted_songs[i] == sorted_songs[i + 1]:
                flag = False
        if flag:
            break

    for song in songs:
        current_song = ''
        for letter in song:
            if letter != ' ':
                letter = '*'
            current_song += letter
        current_songs.append(current_song)

    while True:  # Game loop
        for player in range(player_num):  # Player loop
            print('Letter opened：', end='')
            for opened_letter in letters_opened:
                print(opened_letter, end=' ')
            print()
            for i in range(len(current_songs)):
                print(str(i + 1) + '.' + current_songs[i])

            for i in range(player_num):
                print('Player' + str(i + 1) + '：' + str(points[i]))
            print('Player' + str(player + 1) + '\'s turn')
            choice = input('Enter a letter or a song name：')
            if len(choice) == 1:
                points_got = open_letter(choice)
                for i in range(len(songs)):
                    flag = True
                    if len(current_songs[i]) != len(songs[i]):
                        continue
                    for j in range(len(songs[i])):
                        if songs[i][j] in higher_to_lower:
                            if current_songs[i][j] != higher_to_lower[songs[i][j]]:
                                flag = False
                                break
                        elif current_songs[i][j] != songs[i][j]:
                            flag = False
                            break
                    if flag:
                        print(str(i + 1) + ' Terrorist Win-10')
                        points[player] -= 10
                        current_songs[i] = songs[i] + ' '
                print('+' + str(points_got))
                points[player] += points_got
            else:
                guessed_song_num = int(choice.split()[0]) - 1
                song_name_guessed = choice[(len(choice.split()[0]) + 1):]
                points_got = guess_song(guessed_song_num, song_name_guessed)
                print('+' + str(points_got))
                points[player] += points_got


def get_point(letter):
    multiplayer = 0
    if letter in alphabet_letters:
        multiplayer = 1
    elif letter in higher_to_lower:
        if higher_to_lower[letter]:
            multiplayer = 1
    elif letter in numbers:
        multiplayer = 2
    else:
        multiplayer = 3
    return multiplayer


def open_letter(letter_opened):
    global current_songs
    global letters_opened

    point = 0

    multiplayer_ol = get_point(letter_opened)

    letters_opened.append(letter_opened)
    for i in range(len(songs)):
        for j in range(len(songs[i])):
            if current_songs[i][j] == '*' and songs[i][j] == letter_opened:
                current_songs[i] = current_songs[i][:j] + letter_opened + \
                                   current_songs[i][(j + 1):]
                point += multiplayer_ol
            elif songs[i][j] in higher_to_lower:
                if current_songs[i][j] == '*' \
                        and higher_to_lower[songs[i][j]] == letter_opened:
                    current_songs[i] = current_songs[i][:j] + letter_opened + \
                                       current_songs[i][(j + 1):]
                    point += multiplayer_ol

    return point


def guess_song(guessed_song_num, song_name_guessed):
    if songs[guessed_song_num] == song_name_guessed:
        point = 5
        print('Correct', end=' ')
        for i in range(len(current_songs[guessed_song_num])):
            if current_songs[guessed_song_num][i] == '*':
                point += get_point(songs[guessed_song_num][i])
        current_songs[guessed_song_num] = song_name_guessed + ' '
    else:
        print('Incorrect')
        point = 0

    return point


main()
