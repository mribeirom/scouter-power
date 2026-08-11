from app.controllers.strength_controller import calcular_epley

def test_calcular_epley_1_rep():
    assert calcular_epley(100.0, 1) == 100.0

def test_calcular_epley_multiple_reps():
    assert calcular_epley(100.0, 5) == 116.65

def test_calcular_epley_0_reps():
    assert calcular_epley(100.0, 0) == 100.0
