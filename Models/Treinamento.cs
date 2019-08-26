using System;
using System.Collections.Generic;

public class Treinamento
{
    public int Id{get; set;}
    public String Tema {get; set;}
    public Usuario Autor {get; set;}
    public int Tipo {get; set;}
    public String Senha {get; set;}
    public ICollection<Modulo> Modulos{get; set;}
    
}