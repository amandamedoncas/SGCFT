using System;
using System.Collections.Generic;

public class Modulo
{
    public int Id{get; set;}
    public int IdTreinamento{get; set;}
    public String Titulo {get; set;}
    public ICollection<Video> Videos{get; set;}
}