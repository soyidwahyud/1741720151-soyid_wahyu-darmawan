import numpy as np
import json
hasil = (np.array([9]) - np.array([6, 9, 4, 5])) / (np.array([9]) - np.array([4]))

# print(hasil)

matriks_keputusan = [
    [6, 5, 7, 8],
    [9, 6, 8, 5],
    [4, 4, 8, 6],
    [5, 7, 6, 6]
]

for i in range(len(matriks_keputusan)):
  print(i, matriks_keputusan[i])

a = ['Mary', 'had', 'a', 'little', 'lamb']
for i in range(len(a)):
  print(i, a[i])

# print(json(i, a[i]))