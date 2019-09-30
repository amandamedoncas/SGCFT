using System;
using System.Collections.Generic;

public class Pergunta{
    public int Id{get; set;}

    public string Texto {get; set;}
    public ICollection<Alternativa> Alternativas {get; set;}
    

}