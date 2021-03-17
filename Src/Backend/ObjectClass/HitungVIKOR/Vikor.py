import numpy as np

# Fungsi Perankingan
def ranking(flow):
    rank_xy = np.zeros((flow.shape[0], 2))
    for i in range(0, rank_xy.shape[0]):
        rank_xy[i, 0] = 0
        rank_xy[i, 1] = flow.shape[0] - i

    return

# Perhitungan VIKOR
# def vikor_method(dataset, weights, criterion_type, strategy_coefficient = 0.5, graph = True):
def vikor_method(dataset, weights, criterion_type, strategy_coefficient=0.5, graph=True):
    X = np.copy(dataset)
    w = np.copy(weights)
    best  = np.zeros(X.shape[1])
    worst = np.zeros(X.shape[1])
    for i in range(0, dataset.shape[1]):
        if (criterion_type[i] == 'benefit'):
            best[i]  = np.max(X[:, i])
            worst[i] = np.min(X[:, i])
        else:
            best[i]  = np.min(X[:, i])
            worst[i] = np.max(X[:, i])

    s_i = w*( abs(best - X) / abs(best - worst) )
    s_normalisasi = abs(best - X) / abs(best - worst)
    s_normalisasi_bobot = w * s_normalisasi
    r_i = np.max(s_i, axis = 1)
    s_i = np.sum(s_i, axis = 1)
    s_best = np.min(s_i)
    s_worst = np.max(s_i)
    r_best = np.min(r_i)
    r_worst = np.max(r_i)
    q_i = strategy_coefficient*( (s_i - s_best) / (s_worst - s_best) ) + (1 - strategy_coefficient)*( (r_i - r_best) / (r_worst - r_best) )
    dq = 1 /(X.shape[0] - 1)

    flow_best = np.copy(best)
    flow_worst = np.copy(worst)

    flow_normalisasi = np.copy(s_normalisasi)
    flow_normalisasi_bobot = np.copy(s_normalisasi_bobot)
    # flow_normalisasi = np.reshape(flow_normalisasi, (s_normalisasi.shape[4], 1))
    # flow_normalisasi = np.insert(flow_normalisasi, 0, list(range(1, s_normalisasi.shape[0] + 1)), axis=1)
    # flow_normalisasi = flow_normalisasi[np.argsort(flow_normalisasi[:, 1])]

    flow_s = np.copy(s_i)
    flow_s = np.reshape(flow_s, (s_i.shape[0], 1))
    flow_s = np.insert(flow_s, 0, list(range(1, s_i.shape[0]+1)), axis = 1)
    flow_s = flow_s[np.argsort(flow_s[:, 1])]

    flow_r = np.copy(r_i)
    flow_r = np.reshape(flow_r, (r_i.shape[0], 1))
    flow_r = np.insert(flow_r, 0, list(range(1, r_i.shape[0]+1)), axis = 1)
    flow_r = flow_r[np.argsort(flow_r[:, 1])]

    flow_q = np.copy(q_i)
    flow_q = np.reshape(flow_q, (q_i.shape[0], 1))
    flow_q = np.insert(flow_q, 0, list(range(1, q_i.shape[0]+1)), axis = 1)
    flow_q = flow_q[np.argsort(flow_q[:, 1])]

    return flow_s, flow_r, flow_q, flow_best, flow_worst, flow_normalisasi, flow_normalisasi_bobot
    # return flow_q
