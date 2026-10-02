import React from 'react';
import { Star, MapPin, CheckCircle, ShieldCheck, ThumbsUp } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Arno.77',
      role: 'Client vérifié Google · 2 avis',
      date: 'Février 2021',
      rating: 5,
      content:
        "Entreprise très professionnelle. Services de qualité du début à la fin (certification AFNOR). Emballage, démontage-remontage de meubles, protection des objets fragiles, effectués avec beaucoup de soin. Equipe agréable, efficace et très à l'écoute du client. Je recommande sans réserve !",
      tags: ['Certification AFNOR', 'Démontage-remontage', 'Objets fragiles'],
      ownerResponse:
        "Nous tenons à vous remercier pour cette belle recommandation. Merci pour toute la confiance que vous nous avez accordée."
    },
    {
      author: 'Edouard Pilip',
      role: 'Client vérifié Google · 2 avis',
      date: 'Novembre 2021',
      rating: 5,
      content:
        "Déménagement impeccable ! L'équipe est très professionnelle, ponctuelle, soigneuse avec nos effets fragiles et nos meubles et très efficace ! Tout cela dans une ambiance agréable avec des déménageurs à l'écoute et de bon conseil sur les petites choses auxquelles on ne pense pas forcément et qui font que le déménagement se passe au mieux. Je recommande à 100% !",
      tags: ['Ponctualité', 'Soigneux', 'Réactivité & Qualité'],
      ownerResponse: null
    },
    {
      author: 'Vincent David',
      role: 'Local Guide Google · 22 avis',
      date: 'Juillet 2021',
      rating: 5,
      content:
        "Très bonne expérience. Equipe très pro, toutes les précautions nécessaires sont prises et travail effectué avec le sourire tout en restant très professionnels. Nous avions pris le déménagement formule Confort et c'est l'équipe de 1ST Déménagement qui a tout pris en charge avec brio !",
      tags: ['Formule Confort', 'Protection totale', 'Équipe souriante'],
      ownerResponse:
        "Un grand merci à vous pour la confiance que vous nous avez accordée et pour le temps accordé à ce beau commentaire !"
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Google Score */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Avis Google Maps Vérifiés</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Ce que nos clients disent de 1ST Déménagement
            </h2>
            <p className="text-sm text-slate-600 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>14 Rue Laugier, 75017 Paris</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">Certification AFNOR</span>
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 shrink-0">
            <div className="text-center pr-4 border-r border-slate-100">
              <div className="text-3xl font-black text-slate-900 font-display tabular-nums">4,8</div>
              <div className="flex items-center gap-0.5 mt-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">53 avis Google</div>
            </div>

            <div className="text-xs space-y-1 text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>100% Retours Positifs</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Ponctualité · Soin des meubles · Équipe pro
              </div>
            </div>
          </div>
        </div>

        {/* Filter tags mentioned in reviews */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1">Points forts soulignés :</span>
          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
            Protection des meubles (7)
          </span>
          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
            Professionnalisme (6)
          </span>
          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
            Déménageurs agréables (5)
          </span>
          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 font-medium">
            Gestion sans stress (3)
          </span>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{rev.author}</h3>
                    <p className="text-[11px] text-slate-400">{rev.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.content}"
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {rev.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {rev.ownerResponse && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div className="font-bold text-slate-700 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 text-blue-600" />
                    <span>Réponse de 1ST Déménagement :</span>
                  </div>
                  <p>{rev.ownerResponse}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
