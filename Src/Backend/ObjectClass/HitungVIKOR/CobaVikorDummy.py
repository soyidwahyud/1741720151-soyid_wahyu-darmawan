import numpy as np
from ObjectClass.HitungVIKOR.Vikor import vikor_method, ranking

# weights = np.array([ [0.35, 0.30, 0.20, 0.15] ])
weights = np.array([ [0.30, 0.25, 0.28, 0.17] ])

# Load Criterion Type: 'max' or 'min'
criterion_type = ['benefit', 'benefit', 'benefit', 'benefit']

# criterion_type = ['min', 'max', 'max', 'max']
# dataset_1 = np.array([6, 5, 7, 8])
# dataset_2 = np.array([9, 6, 8, 5])
# dataset_3 = np.array([4, 4, 8, 6])
# dataset_4 = np.array([5, 7, 6, 6])
# dataset = np.array([
#                 [dataset_1],
#                 [dataset_2],
#                 [dataset_3],
#                 [dataset_4]
#                 ])
dataset = np.array([
                [6, 5, 7, 8],   #a1
                [9, 6, 8, 5],   #a2
                [4, 4, 8, 6],   #a3
                [5, 7, 6, 6]   #a4
                ])

# Call VIKOR

s, r, q, best, worst, normalisasi, normalisasi_bobot = vikor_method(dataset, weights, criterion_type, strategy_coefficient = 0.5, graph = False)
arrayData = vikor_method(dataset, weights, criterion_type, strategy_coefficient = 0.5, graph = False)

# Graph Solutions
# ranking(s)
# ranking(r)
# ranking(q)
# ranking(c_solution) # Final Solution
# print(arrayData)

print("Max : ")
print(best)
print()
print("Min : ")
print(worst)
print()
print("Normalisasi : ")
print(normalisasi)
print()
print("Normalisasi bobot : ")
print(normalisasi_bobot)
print()
print("penentuan nilai SI : ")
print(s)
print()
print("penentuan nilai RI : ")
print(r)
print()
print("penentuan ranking Indeks VIKOR : ")
print(q)
print()
# print(c_solution) # Final Solution
# m = max(9, 0)
# print(m)
