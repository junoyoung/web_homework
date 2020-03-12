def texas(black,white):
    """

    :param black:
    :param white:
    :return:
    >>> texas('2H 3D 5S 9C KD', '2C 3H 4S 8C AH')
    'White wins'
    >>> texas('2H 4S 4C 2D 4H', '2S 8S AS QS 3S')
    'Black wins'
    >>> texas('2H 3D 5S 9C KD', '2C 3H 4S 8C KH')
    'Black wins'
    >>> texas('2H 3D 5S 9C KD', '2D 3H 5C 9S KH')
    'Tie'
    >>> texas('2D 3H 3C 5H 6D', '3S 3D 4C 5D 6D')
    'White wins'
    >>> texas('2D 3H 3C 6H 6D', '3S 3D 6C 5D 6S')
    'White wins'
    >>> texas('2D 2H 2C 2S 6D', '3S 3H 3C 3D 6S')
    'White wins'
    >>> texas('2D 2H 2C 6S 6D', '3S 3H 3C 4D 9S')
    'Black wins'
    """

    b, bs = sh(black)
    w, ws = sh(white)
    gz = ['ths', 'tz', 'hl', 'th', 'sz', 'st', 'ld', 'dz', 'sp']
    if gz.index(w) < gz.index(b):
        return 'White wins'
    elif gz.index(w) > gz.index(b):
        return 'Black wins'
    elif ws == bs:
        return 'Tie'
    else:
        i = len(ws)-1
        a = 0
        while a == 0:
            a = ws[i] - bs[i]
            i = i-1
        if a > 0:
            return 'White wins'
        if a < 0:
            return 'Black wins'


def istonghua(x):
    d,s,h,c = 0,0,0,0
    for i in range(len(x)):
        a = x[i][1]
        if a == 'D':
            d += 1
        if a == 'S':
            s += 1
        if a == 'H':
            h += 1
        if a == 'C':
            c += 1
    return 5 in [d,s,h,c]


def isshunzi(x):
    x = sortstr(x)
    a = []
    for i in range(9):
        a.append(list(range(i,5)))
    return x in a


def sortstr(x):
    a = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
    str = []
    for i in range(len(x)):
        str.append(a.index(x[i][0]))
    str = sorted(str)
    return str


def numof(x):
    dicta = {}
    for i in x:
        dicta[i] = x.count(i)
    a = [list(dicta.keys()),list(dicta.values())]
    if 4 in a[1]:
        return 'tz', [a[0][a[1].index(4)]]
    elif 3 in a[1]:
        if 2 in a[1]:
            return 'hl', [a[0][a[1].index(3)]]
        else:
            return 'st', [a[0][a[1].index(3)]]
    elif a[1].count(2) == 2:
        m = a[0].copy()
        m.remove(m[a[1].index(1)])
        m.sort()
        m.insert(0,a[0][a[1].index(1)])
        return 'ld', m
    elif a[1].count(2) == 1:
        m = a[0].copy()
        # print(a,m)
        m.remove(m[a[1].index(2)])
        m.sort()
        m.append(a[0][a[1].index(2)])
        return 'dz', m
    else:
        return 'sp', x


def sh(x):
    x = x.split(' ')
    h = istonghua(x)
    s = isshunzi(x)
    if s and h:
        return 'ths', max(sortstr(x))
    elif s:
        return 'sz', max(sortstr(x))
    elif h:
        return 'th', sortstr(x)
    else:
        return numof(sortstr(x))
